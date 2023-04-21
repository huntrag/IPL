import requests
import json
from bs4 import BeautifulSoup

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

# cnt=0

for card in soup.findAll('div',attrs={'class':"keeda_cricket_event_card"}):
    # cnt+=1
    # if cnt==8:
    #     break
    quote={}
    lst=card.find('div',attrs={'class':"keeda_cricket_event_date"})
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

with open("./scripts/results2023_temp.json","w") as outfile:
    json.dump(quotes,outfile)