

@csrf_exempt
def all_matches(request):
    # all_matches_list=[]
    if request.method == 'GET':
        
        #########################
            all_matches_list = []
            cursor = connection.cursor()
            cursor.execute(f""" select match_id from match_details""")
            mi = cursor.fetchall()
            mid = request.GET.get('match_id')
        #    if (every_match_id[0] == 829763):
            #print(match_now[0])
            match_now = mid
            main_dict = dict()
            cursor.execute(f"""SELECT md.Match_id,md.Date, md.Match_number, md.Venue, md.Team1, md.Team2, r.Result_details, r.Man_of_match 
                 FROM match_details md JOIN result r ON md.Match_id = r.Match_id where md.match_id = '{match_now}' """)

            
            rows = cursor.fetchall()
            # print(rows)
            header = dict()
            for row in rows:
                d1 = dict()
                d2 = dict()
                cursor.execute(f"""select sc.Match_id, sc.inning_number, sc.name, t.short, sc.total_runs,
sc.total_wickets, sc.total_overs, sc.total_extras_runs, sc.lb, sc.wd, sc.byes, sc.nb
from scorecard sc, teams t, match_details m
 where t.short = sc.name and sc.match_id = m.match_id and sc.match_id = '{match_now}'order by inning_number asc """)
                rows1 = cursor.fetchall()
                for i in range(len(rows1)):
                  if (i == 0):
                       short1 = rows1[i][3]
                       name1 =  rows1[i][2]
                       overs1  = rows1[i][6]
                       runs1 =  rows1[i][4]
                       wickets1 = rows1[i][5]
                       d1 = {
                        'short': rows1[i][3],
                        'name': rows1[i][2],
                        'overs': rows1[i][6],
                        'runs': rows1[i][4],
                        'wickets': rows1[i][5]
                    }
                else:
                       short2 = rows1[i][3]
                       name2 =  rows1[i][2]
                       overs2  = rows1[i][6]
                       runs2 =  rows1[i][4]
                       wickets2 = rows1[i][5]
                       d2 = {
                        'short': rows1[i][3],
                        'name': rows1[i][2],
                        'overs': rows1[i][6],
                        'runs': rows1[i][4],
                        'wickets': rows1[i][5]
                    }
                
                header = {
                    'id': row[0],
                    'date': row[1],
                    'match_no': row[2],
                    'venue': row[3],
                    'result': row[6],
                    'team1': d1,
                    'team2': d2,
                }


################################
        

                summary = dict()
                d = []
                cursor.execute(f"""Select man_of_match from result where match_id = '{match_now}'""")
                mom = {
                    'name' :cursor.fetchall()[0][0],
                    'performance':''
                }
                
                for i in range(1, 3):

                    cursor.execute(f'''SELECT match_id, inning_number, batsman, runs, balls_faced, fours, sixes,
            runs/balls_faced*100 AS sr, dismissal, wicket_bowler, wicket_fielder
        FROM (
            SELECT match_id, inning_number, batsman, runs, balls_faced, fours, sixes,
                runs/balls_faced*100 AS sr, dismissal, wicket_bowler, wicket_fielder,
                row_number() OVER (PARTITION BY match_id, inning_number ORDER BY runs DESC) AS rn
            FROM batting_scorecard
        ) AS t
        WHERE rn <= 3 AND match_id = '{match_now}' AND inning_number = {i}
        ORDER BY match_id DESC, inning_number ASC, runs DESC
    ''')
                    
                    batter = cursor.fetchall()
                    d1 = dict()
                    d1_list=[]
                    for batsman in batter:
                        d1 = {
                            'name': batsman[2],
                            'runs': batsman[3],
                            'balls': batsman[4]
                        }
                        d1_list.append(d1)

                    cursor.execute(f"""select match_id, inning_number, bowler, overs,  dots, runs_conceded, wickets, economy from 
    (
    select match_id, inning_number, bowler, overs, dots, runs_conceded, wickets, economy,
    row_number() over (partition by match_id, inning_number order by wickets desc,
    economy asc) as rn
    from bowling_scorecard
    ) as t
    where rn <= 3 and match_id='{match_now}' and inning_number={i} order by match_id desc, inning_number asc, wickets desc, economy asc;""")
                    bowlers = cursor.fetchall()
                    # print(bowlers)
                    d2 = dict()
                    d2_list=[]

                    for bowler in bowlers:
                        d2 = {
                            'name': bowler[2],
                            'wickets': bowler[6],
                            'runs': bowler[5],
                            'overs':bowler[3]
                        }
                        d2_list.append(d2)
                
                
                    if (i == 1):
                        d.append({
                            'name': name1,
                            'short': short1,
                            'runs': runs1,
                            'wickets': wickets1,
                            'overs': overs1,
                            'batting': d1_list,
                            'bowling': d2_list
                        })
                    else:
                        d.append({
                            'name': name2,
                            'short': short2,
                            'runs': runs2,
                            'wickets': wickets2,
                            'overs': overs2,
                            'batting': d1_list,
                            'bowling': d2_list
                        })
                    
                summary = {
                        'mom': mom,
                        'team1': d[0],
                        'team2': d[1]
                }
                
######################################################

                scorecard = dict()
                d = []
                
                for i in range(1, 3):

                    cursor.execute(f'''
SELECT match_id, inning_number, batsman, runs, balls_faced, fours, sixes, runs/balls_faced*100 
AS sr, dismissal, wicket_bowler, wicket_fielder from batting_scorecard where match_id = '{match_now}' and inning_number = {i};
    ''')
                    
                    batter = cursor.fetchall()
                    d1 = dict()
                    score=[]
                    for batsman in batter:
                        # print(batsman)
                        if(batsman[8] == 'caught'):
                            dismissal = "c " + batsman[10] + " b " + batsman[9] 
                            
                        if(batsman[8] == 'bowled'):
                            dismissal =  " b " + batsman[9] 
                            
                        if(batsman[8] == 'run out'):
                            dismissal = "run out " + batsman[10] 
                            
                        if(batsman[8] == 'hit wicket'):
                            dismissal =  " b " + batsman[9] 
                            
                        if(batsman[8] == 'lbw'):
                            dismissal =  " lbw " + batsman[9] 
                        if(batsman[8]==''):
                            dismissal="Not out"
                        
                        
                        
                        d1 = {
                            'name': batsman[2],
                            'runs': batsman[3],
                            'balls': batsman[4],
                            'fours': batsman[5],
                            'sixes':batsman[6],
                            'sr': round(batsman[7],2),
                            'dismissal':  dismissal
                        }
                        score.append(d1)

                    cursor.execute(f"""select match_id, inning_number, bowler, overs,  dots, runs_conceded, wickets, economy from bowling_scorecard
 where match_id= '{match_now}' and inning_number= {i};""")
                    bowlers = cursor.fetchall()
                    # print(bowlers)
                    d2 = dict()
                    d2_list=[]
                    for bowler in bowlers:
                        d2 = {
                            'name': bowler[2],
                            'runs': bowler[5],
                            'maiden':bowler[4],
                            'wickets': bowler[6],
                            'overs':bowler[3],
                            'economy':round(bowler[7]*6,2)
                        }
                        d2_list.append(d2)
                
                
                    cursor.execute(f"""select total_extras_runs, lb, wd, byes, nb from scorecard where match_id = '{match_now}' 
                                   and inning_number = {i}""")
                    
                    extras = cursor.fetchall()
                    if (extras == ()):
                        new_tuple = extras + ((0,0,0,0,0),)
                        extras = new_tuple
                    
                    print(extras)
                    cursor.execute(f"""select batsman from fall_of_wickets where match_id = '{match_now}' and inning_number = {i} """)
                    fow = cursor.fetchall()
                    # print(fow)
                    fow_list = []
                    for f in fow:
                        fow_list.append({'name': f[0],'runs':'','wickets':'','overs':''})
                        
                    d1_list={
                        'score': score,
                         'total_extras': extras[0][0],
                         'extrasinfo':"( "+"B: "+str(extras[0][3])+" ,LB: "+str(extras[0][1])+" ,NB: "+str(extras[0][4])+" ,W: "+str(extras[0][2])+" )",
                        'fallofwickets': fow_list,
                    }
                    
                    if (i == 1):
                        d.append({
                            'name': name1,
                            'short': short1,
                            'runs': runs1,
                            'wickets': wickets1,
                            'overs': overs1,
                            'batting': d1_list,
                            'bowling': d2_list
                              
                        })
                    else:
                        
                        d.append({
                            'name': name2,
                            'short': short2,
                            'runs': runs2,
                            'wickets': wickets2,
                            'overs': overs2,
                            'batting': d1_list,
                            'bowling': d2_list            
                        })
                    
                scorecard = {
                        'inn1': d[0],
                        'inn2': d[1]
                }
                main_dict ={
                    'header': header,
                    'summary': summary,
                    'scorecard':scorecard
                }
            
            # print(main_dict)
            all_matches_list.append(main_dict)    
            
    return JsonResponse(all_matches_list, safe=False)

                
@csrf_exempt
def most_dots(request):
    if request.method == 'GET':
        max_dots = []
        # yr = request.POST.get('year')
        #body_unicode=request.body.decode('utf-8')
        #body=json.loads(body_unicode)
        yr = request.GET.get('year')
        # print(yr)
        cursor = connection.cursor()
        
        cursor.execute(f""" SELECT season_id, player_name, short, total_dots as max_dots
FROM (
    SELECT pts.season_id, t.short, p.player_name, SUM(b.dots) AS total_dots
    FROM bowling_scorecard b, player p, pts, match_details m, teams t, seasons s
    WHERE pts.player_id = p.player_id
        AND b.bowler = p.player_name 
        AND pts.season_id = s.season_id 
        AND s.year = {yr} 
        AND m.match_id = b.match_id 
        AND m.season_id = pts.season_id 
        AND pts.team_id = t.team_id 
    GROUP BY pts.season_id, b.bowler, t.short
) rf 
GROUP BY season_id, player_name, short
ORDER BY season_id DESC, max_dots DESC
LIMIT 15""")

        rows=cursor.fetchall()
        d=dict()
        for row in rows:
            d={
                'name':row[2],
                'team':row[1],
                'stats':row[3],
            }
            max_dots.append(d)
        return JsonResponse(max_dots, safe=False)     


@csrf_exempt
def best_economy(request):
    if request.method == 'GET':
        best_economy = []
        # yr = request.POST.get('year')
        # print(yr)
        # body_unicode=request.body.decode('utf-8')
        # body=json.loads(body_unicode)
        yr = request.GET.get('year')
        cursor = connection.cursor()
        
        cursor.execute(f""" SELECT season_id, player_name, short, runs/balls*6 as max_economy
FROM (
    SELECT pts.season_id, t.short, p.player_name, SUM(b.Runs_Conceded) as runs,
    sum(floor(b.overs)* 6 + (b.overs - floor(b.overs))*10) as balls
    FROM bowling_scorecard b, player p, pts, match_details m, teams t, seasons s
    WHERE pts.player_id = p.player_id
        AND b.bowler = p.player_name 
        AND pts.season_id = s.season_id 
        AND s.year = {yr} 
        AND m.match_id = b.match_id 
        AND m.season_id = pts.season_id 
        AND pts.team_id = t.team_id 
    GROUP BY pts.season_id, b.bowler, t.short
    having sum(floor(b.overs))>=4
) rf 
GROUP BY season_id, player_name, short
ORDER BY season_id DESC, max_economy asc
LIMIT 15;""")

        rows=cursor.fetchall()
        d=dict()
        for row in rows:
            d={
                'name':row[1],
                'team':row[2],
                'stats':row[3],
            }
            best_economy.append(d)
        return JsonResponse(best_economy, safe=False)  
    
    
    
@csrf_exempt
def max_wickets_in_innings(request):
    if request.method == 'GET':
        max_wickets_list = []
        # yr = request.POST.get('year')
        # print(yr)
        #body_unicode=request.body.decode('utf-8')
        #body=json.loads(body_unicode)
        yr = request.GET.get('year')
        cursor = connection.cursor()
        cursor.execute(f""" select  season_id, short, player_name, total_wickets as max_wickets from (
select pts.season_id, t.short, p.player_name, max(b.wickets) as total_wickets 
from bowling_scorecard b, player p, pts, match_details m, teams t, seasons s where 
pts.player_id = p.player_id and b.bowler = p.player_name and t.team_id = pts.team_id
and pts.season_id = s.season_id and s.year = {yr} and m.match_id = b.match_id and m.season_id = 
pts.season_id group by  s.season_id, b.bowler, t.short) rf GROUP BY season_id, player_name, short
ORDER BY max_wickets DESC
LIMIT 15;
""")
        rows=cursor.fetchall()
        d=dict()
        for row in rows:
            d={
                'name':row[2],
                'team':row[1],
                'stats':row[3],
                
            }
            max_wickets_list.append(d)
        return JsonResponse(max_wickets_list, safe=False)  
            
            
@csrf_exempt
def highest_runs_in_innings(request):
    if request.method == 'GET':
        # print(request)
        highest_runs_list = []
        # yr = request.POST.get('year')
        # print(yr)
        #body_unicode=request.body.decode('utf-8')
        #body=json.loads(body_unicode)
        yr=request.GET.get('year')
        cursor = connection.cursor()
        cursor.execute(f""" select  season_id, player_name, short, total_runs as max_runs from (
select pts.season_id, t.short, p.player_name, max(runs) as total_runs from batting_scorecard b,
player p, pts, match_details m, teams t, seasons s where pts.player_id = p.player_id and b.batsman = p.player_name 
and pts.season_id = s.season_id  and s.year = {yr} and m.match_id = b.match_id and m.season_id = pts.season_id 
and pts.team_id = t.team_id  group by pts.season_id, b.batsman, t.short) rf GROUP BY season_id, player_name, short
ORDER BY season_id desc, max_runs DESC
LIMIT 15;
""")
        rows=cursor.fetchall()
        d=dict()
        for row in rows:
            d={
                'name':row[1],
                'team':row[2],
                'stats':row[3],
                
            }
            highest_runs_list.append(d)
        return JsonResponse(highest_runs_list, safe=False)
    
    
@csrf_exempt
def highest_runs_all_seasons(request):
    if request.method == 'GET':
        highest_runs_all_seasons_list = []
        cursor = connection.cursor()
        cursor.execute(f""" SELECT year, short, player_name, max(total_runs) as max_runs
FROM (
    SELECT s.year, t.short, p.player_name, max(b.runs) as total_runs
    FROM batting_scorecard b
    JOIN player p ON b.batsman = p.player_name
    JOIN pts ON pts.player_id = p.player_id
    JOIN match_details m ON m.match_id = b.match_id AND m.season_id = pts.season_id
    JOIN teams t ON t.team_id = pts.team_id
    JOIN seasons s ON pts.season_id = s.season_id

    GROUP BY b.batsman, t.short, s.year
) AS rf
GROUP BY short, player_name, year
ORDER BY max_runs DESC
LIMIT 15;

""")
        rows=cursor.fetchall()
        d=dict()
        for row in rows:
            d={
                'name':row[2],
                'team':row[1],
                'stats':row[3],
                'year':row[0]
                
            }
            highest_runs_all_seasons_list.append(d)
        return JsonResponse(highest_runs_all_seasons_list, safe=False)
    
    
@csrf_exempt
def highest_wickets_all_seasons(request):
    if request.method == 'GET':
        highest_wickets_all_seasons_list = []
        cursor = connection.cursor()
        cursor.execute(f""" SELECT year, short, player_name, max(total_wickets) as max_wickets
FROM (
    SELECT s.year, t.short, p.player_name, max(b.wickets) as total_wickets
    FROM bowling_scorecard b
    JOIN player p ON b.bowler = p.player_name
    JOIN pts ON pts.player_id = p.player_id
    JOIN match_details m ON m.match_id = b.match_id AND m.season_id = pts.season_id
    JOIN teams t ON t.team_id = pts.team_id
    JOIN seasons s ON pts.season_id = s.season_id

    GROUP BY b.bowler, t.short, s.year
) AS rf
GROUP BY short, player_name, year
ORDER BY max_wickets DESC
LIMIT 15;
""")
        rows=cursor.fetchall()
        d=dict()
        for row in rows:
            d={
                'name':row[2],
                'team':row[1],
                'stats':row[3],
                'year':row[0]
                
            }
            highest_wickets_all_seasons_list.append(d)
        return JsonResponse(highest_wickets_all_seasons_list, safe=False)
    
    
@csrf_exempt
def highest_chased_runs(request):
    if request.method == 'GET':
        highest_chased_runs_list = []
        cursor = connection.cursor()
        cursor.execute(f""" 
select name, total_runs from scorecard where inning_number = 2 order by total_runs desc limit 15;

""")
        rows=cursor.fetchall()
        print(f"hello : {rows}")
        d=dict()
        for row in rows:
            d={
                
                'team':row[0],
                'stats':row[1]
                
            }
            print(f"hello : {d}")
            highest_chased_runs_list.append(d)
        return JsonResponse(highest_chased_runs_list, safe=False)
    

@csrf_exempt
def highest_team_runs(request):
    if request.method == 'GET':
        highest_team_runs_list = []
        cursor = connection.cursor()
        cursor.execute(f""" 
select name, total_runs from scorecard order by total_runs desc limit 15;


""")
        rows=cursor.fetchall()
        d=dict()
        for row in rows:
            d={
                
                'team':row[0],
                'stats':row[1]
                
            }
            print(f"hello : {d}")
            highest_team_runs_list.append(d)
        return JsonResponse(highest_team_runs_list, safe=False)
    
@csrf_exempt
def test_api(request):
    body_unicode=request.body.decode('utf-8')
    body=json.loads(body_unicode)
    yr=body['year']
    
    # return {
    #     'nfeoif':yr
    # }
    return JsonResponse(body)