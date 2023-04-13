import requests
import json
from bs4 import BeautifulSoup

headers = {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"}
URL="https://www.sportskeeda.com/go/ipl/schedule"
r = requests.get(url=URL, headers=headers)


soup = BeautifulSoup(r.content, 'html5lib')

quotes=[]

for card in soup.findAll('div',attrs={'class':"keeda_cricket_event_card"}):
    quote={}
    lst=card.find('div',attrs={'class':"keeda_cricket_event_date"}).text.split('\n')
    quote["date"]=lst[1]
    quote["time"]=lst[3]

    lst=card.find('div',attrs={'class':"keeda_cricket_venue"}).text.split('\n')
    quote["no"]=lst[1]
    quote['venue']=lst[2][2:]
    quote["team1"]=card.findAll('div',attrs={'class':"keeda_cricket_team"})[0].findAll('span')[1].text[1:-1]
    quote["team2"]=card.findAll('div',attrs={'class':"keeda_cricket_team"})[1].findAll('span')[1].text[1:-1]
    quotes.append(quote)

with open("./scripts/schedule.json","w") as outfile:
    json.dump(quotes,outfile)