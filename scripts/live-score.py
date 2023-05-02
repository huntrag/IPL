import requests
import json
from bs4 import BeautifulSoup

headers = {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"}
URL="https://www.espncricinfo.com/series/indian-premier-league-2023-1345038/points-table-standings"
r = requests.get(url=URL, headers=headers)


soup = BeautifulSoup(r.content, 'html5lib')

table=soup.find('tbody',attrs={"class":"ds-text-center"})

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
cnt=0
for row in table.findAll('tr'):
    cnt+=1
    if cnt%2==0:
        continue
    quote={}
    counter=0
    for ex in row.findAll('td'):
        counter+=1
        if counter==1:
            lo=0
            for sp in ex.findAll('span'):
                if lo==0:
                    quote["pos"]=sp.text
                if lo==1:
                    quote["name"]=sp.text
                    quote["img"]="https://scores.iplt20.com/ipl/teamlogos/"+tag[sp.text]+".png?v=2"
                lo+=1
            
        if counter==2:
            quote["matches"]=ex.text
        if counter==3:
            quote["won"]=ex.text
        if counter==4:
            quote["lost"]=ex.text
        if counter==5:
            quote["tie"]=ex.text
        if counter==6:
            quote["n/r"]=ex.text
        if counter==7:
            quote["points"]=ex.text
        if counter==8:
            quote["nrr"]=ex.text
        if counter==9:
            match=[]
            for div in ex.findAll('span'):
                match.append(div.text)
            quote["last"]=match
        if counter==10:
            quote["next"]=ex.span.text
    
    quotes.append(quote)



with open("./scripts/live-table.json","w") as outfile:
    json.dump(quotes,outfile)