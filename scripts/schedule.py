import requests
import json
from bs4 import BeautifulSoup

headers = {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"}
URL="https://www.sportskeeda.com/go/ipl/schedule"
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

quotes=[]

for card in soup.findAll('div',attrs={'class':"keeda_cricket_event_card"}):
    quote={}
    lst=card.find('div',attrs={'class':"keeda_cricket_event_date"}).text.split('\n')
    quote["date"]=lst[1]
    quote["time"]=lst[3]

    lst=card.find('div',attrs={'class':"keeda_cricket_venue"}).text.split('\n')
    quote["no"]=lst[1]
    quote['venue']=lst[2][2:]
    team1=card.findAll('div',attrs={'class':"keeda_cricket_team"})[0].findAll('span')[1].text[1:-1]
    quote["team1"]=team1
    quote["team1Short"]=tag[team1]
    team2=card.findAll('div',attrs={'class':"keeda_cricket_team"})[1].findAll('span')[1].text[1:-1]
    quote["team2"]=team2
    quote["team2Short"]=tag[team2]
    quotes.append(quote)

with open("./scripts/schedule.json","w") as outfile:
    json.dump(quotes,outfile)