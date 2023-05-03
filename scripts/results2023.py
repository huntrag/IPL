import requests
import json
from bs4 import BeautifulSoup
import uuid
from operator import itemgetter

headers = {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"}
URL="https://www.sportskeeda.com/go/ipl/results"
r = requests.get(url=URL, headers=headers)


soup = BeautifulSoup(r.content, 'html5lib')

tag={}
tag["Chennai Super Kings"]="CSK"
tag["Punjab Kings"]="PBKS"
tag["Royal Challengers Bangalore"]="RCB"
tag["Rajasthan Royals"]="RR"
tag["Sunrisers Hyderabad"]="SRH"
tag["Gujarat Titans"]="GT"
tag["Mumbai Indians"]="MI"
tag["Delhi Capitals"]="DC"
tag["Kolkata Knight Riders"]="KKR"
tag["Lucknow Super Giants"]="LSG"

revtag={}
revtag["CSK"]="Chennai Super Kings"
revtag["PBKS"]="Punjab Kings"
revtag["RCB"]="Royal Challengers Bangalore"
revtag["RR"]="Rajasthan Royals"
revtag["SRH"]="Sunrisers Hyderabad"
revtag["GT"]="Gujarat Titans"
revtag["MI"]="Mumbai Indians"
revtag["DC"]="Delhi Capitals"
revtag["KKR"]="Kolkata Knight Riders"
revtag["LSG"]="Lucknow Super Giants"

quotes=[]
books=[]

cnt=0

for card in soup.findAll('div',attrs={'class':"keeda_cricket_event_card"}):
    # cnt+=1
    # if cnt==2:
    #     break
    quote={}
    lst=card.find('div',attrs={'class':"keeda_cricket_event_date"})
    quote["id"]=int(uuid.uuid4())%100000000
    quote["date"]=lst['data-match-time']

    lst=card.find('div',attrs={'class':"match-description"}).text
    quote["match_no"]=lst.split('\n')[1].split('Match ')[1]  
    quote['venue']=lst.split('\n')[2][2:]

    quote['result']=card.find('div',attrs={'class':'keeda_cricket_result'}).span.text

    teamcnt=0

    for team1card in card.findAll('div',attrs={'class':"keeda_cricket_team"}):
        team1={}
        team1short=team1card.find('span',attrs={'class':'keeda_cricket_team_name'}).text[1:-1]
        team1['short']=team1short
        team1['name']=revtag[team1short]
        team1score=team1card.find('span',attrs={'class':'keeda_cricket_score'}).text
        scorestr=team1score[1:-1]
        scorelst=scorestr.split(' ')
        team1['overs']=scorelst[1][1:]
        team1['runs']=scorelst[0].split('/')[0]
        team1['wickets']=scorelst[0].split('/')[1]
        if teamcnt==0:
            quote["team1"]=team1
        else:
            quote['team2']=team1
        teamcnt=1

    mom={}

    quote['link']="https://www.sportskeeda.com"+card.a['href']
    soupy = BeautifulSoup(requests.get(url=quote['link'], headers=headers).content, 'html5lib')

    momy=soupy.find('div',attrs={'id':'man-of-match'})
    mom['name']=momy.find('span',attrs={'id':'player-of-match'}).text[1:-1]
    mom['performance']=momy.find('div',attrs={'id':'batting-stat'}).text[1:-1]+" "+momy.find('div',attrs={'id':'bowling-stat'}).text[1:-1]
    quote['mom']=mom

    quotes.append(quote)
    
    # FROM here on scrapping the scoreboard

    book={}

    scorecard={}
    book["id"]=quote["id"]
    inncnt=0
    top3bowls=[]
    top3bats=[]
    summary={}
    summary['mom']=quote['mom']

    for bat in soupy.findAll('div',attrs={'class':'innings-table-batting'}):
        inn={}
        batting={}
        bowling=[]
        scores=[]
        for row in bat.findAll('div',attrs={'class','parent-row-holder'}):
            score={}
            score['name']=row.find('div',attrs={'class':'innings-batsman'}).text[3:].split('\n')[0]
            score['runs']=int(row.find('div',attrs={'class':'innings-runs bold'}).text)
            score['balls']=int(row.find('div',attrs={'class':'innings-balls'}).text)
            score['fours']=int(row.find('div',attrs={'class':'innings-fours'}).text)
            score['sixes']=int(row.find('div',attrs={'class':'innings-sixes'}).text)
            score['sr']=float(row.find('div',attrs={'class':'innings-strike-rate'}).text[:-1])
            score['dismissal']=row.find('p',attrs={'class':'innings-batsman-reason'}).text
            scores.append(score)
        
        batting['score']=scores
        batting['totalextras']=bat.find('div',attrs={'class','innings-extras-runs'}).text
        batting['extrasinfo']=" ".join(bat.find('div',attrs={'class','innings-extras-info'}).text.split('\n'))
        yettobat=[]
        yethelper=bat.find('div',attrs={'class','innings-dnb-info'})
        for player in yethelper.findAll('a'):
            yettobat.append(player.text)

        fow=[]
        fow_helper=bat.find('div',attrs={'class','innings-table-fow'})
        for players in fow_helper.findAll('div',attrs={'class','innings-table-row'}):
            player={}
            player['name']=players.find('span',attrs={'class','fow-batsman'}).text
            runhelper=players.find('div',attrs={'class','innings-score'}).text.split('-')
            player['runs']=int(runhelper[1])
            player['wickets']=int(runhelper[0])
            player['overs']=float(players.find('div',attrs={'class','innings-over'}).text)
            fow.append(player)

        batting['fallofwickets']=fow

        batting['yettobat']=yettobat

        bowhelper=bat.find('div',attrs={'class','innings-table-bowling'})
        for player in bowhelper.findAll('div',attrs={'class','innings-table-row'}):
            bowler={}   
            bowler['name']=player.find('span').text
            bowler['overs']=float(player.find('div',attrs={'class','innings-overs'}).text)
            bowler['maiden']=int(player.find('div',attrs={'class','innings-maiden-overs'}).text)
            bowler['runs']=int(player.find('div',attrs={'class','innings-runs'}).text)
            bowler['wickets']=int(player.find('div',attrs={'class','innings-wickets'}).text)
            bowler['economy']=float(player.find('div',attrs={'class','innings-economy'}).text)

            bowling.append(bowler)
        inn['bowling']=bowling
        top3bowl=sorted(bowling,key=lambda d:(-d['wickets'],d['runs']))[0:3]
        top3bat=sorted(scores,key=lambda d:(-d['runs'],d['balls']))[0:3]

        top3bowls.append(top3bowl)
        top3bats.append(top3bats)

        inn['batting']=batting
        if inncnt==1:
            inn['team']=quote['team1']['name']
            inn['short']=quote['team1']['short']
            inn['totalruns']=int(quote['team1']['runs'])
            inn['totalwickets']=int(quote['team1']['wickets'])
            inn['overs']=float(quote['team1']['overs'])
            team1={}
            team1['name']=quote['team1']['name']
            team1['short']=quote['team1']['short']
            team1['runs']=int(quote['team1']['runs'])
            team1['wickets']=int(quote['team1']['wickets'])
            team1['overs']=float(quote['team1']['overs'])
            team1['batting']=top3bat
            team1['bowling']=top3bowl
            summary['team1']=team1
            
            scorecard['inn1']=inn
        if inncnt==2:
            inn['team']=quote['team2']['name']
            inn['short']=quote['team2']['short']
            inn['totalruns']=int(quote['team2']['runs'])
            inn['totalwickets']=int(quote['team2']['wickets'])
            inn['overs']=float(quote['team2']['overs'])

            team2={}
            team2['name']=quote['team2']['name']
            team2['short']=quote['team2']['short']
            team2['runs']=int(quote['team2']['runs'])
            team2['wickets']=int(quote['team2']['wickets'])
            team2['overs']=float(quote['team2']['overs'])
            team2['batting']=top3bat
            team2['bowling']=top3bowl
            summary['team2']=team2

            scorecard['inn2']=inn
        inncnt+=1
    
    book['summary']=summary
    book['scorecard']=scorecard

    # Summary starts here
    
    

    books.append(book)

    

with open("./scripts/results2023.json","w") as outfile:
    json.dump(quotes,outfile)

with open("./scripts/match2023.json","w") as outfile:
    json.dump(books,outfile)