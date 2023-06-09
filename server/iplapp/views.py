# # Create your views here.
# from django.shortcuts import render
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import json
from django.db import connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def featured_players_func(request):
    cursor = connection.cursor()

    # Retrieve list of unique player names
    cursor.execute('SELECT player_name FROM player LIMIT 10')
    player_names = [row[0] for row in cursor.fetchall()]
    

    # Initialize list to hold player stats
    player_stats = []

    # Get stats for each player
    for name in player_names:
        # Check player type

        cursor.execute(
            f"SELECT player_type FROM PCT WHERE player_name='{name}'")
        player_type = cursor.fetchone()[0]

        # Initialize dictionary to hold player stats
        player_stat = {'player_name': name}

        # Get stats based on player type
        cursor.execute(
            f"SELECT COUNT(DISTINCT combined_table.MATCH_ID) AS matches_played FROM (SELECT MATCH_ID, Bowler AS Player_Name FROM bowling_scorecard UNION ALL SELECT MATCH_ID, Batsman AS Player_Name FROM batting_scorecard) AS combined_table JOIN player AS p ON combined_table.Player_Name = p.player_name WHERE p.player_name='{name}'")
        player_stat['played'] = cursor.fetchone()[0]

        # player_stats.append(player_stat)
        player_stat['specialization'] = player_type
        # player_stats.append(player_stat)

        cursor.execute(
            f"""SELECT

  YEAR(MIN(match_details.date)) AS debut_year
FROM (
  SELECT bowler as pname, Match_ID FROM bowling_scorecard WHERE bowler IN (SELECT player_name FROM player)
  UNION ALL
  SELECT batsman as pname , Match_id FROM batting_scorecard WHERE batsman IN (SELECT player_name FROM player)
) AS combined_scores
JOIN match_details ON combined_scores.Match_id = match_details.Match_id
where pname='{name}';
""")
        player_stat['debut'] = cursor.fetchone()[0]
        # player_stats.append(player_stat)

        player_stat['sp'] = []

        if player_type == 'batsman':
            cursor.execute(f"SELECT COALESCE(SUM(runs), 0) AS total_runs FROM batting_scorecard WHERE batsman='{name}'")
            player_stat['sp'].append(cursor.fetchone()[0])


            cursor.execute(
                f"SELECT MAX(runs) AS highest_score FROM batting_scorecard WHERE batsman='{name}'")
            # player_stat['highest_score'] = cursor.fetchone()[0]
            player_stat['sp'].append(cursor.fetchone()[0])

            cursor.execute(f"SELECT COALESCE(MAX(runs), 0) AS highest_score FROM batting_scorecard WHERE batsman='{name}'")
            player_stat['sp'].append(cursor.fetchone()[0])


            cursor.execute(f"SELECT COALESCE(SUM(IF(runs >= 100, 1, 0)), 0) AS centuries FROM batting_scorecard WHERE batsman='{name}'")
            player_stat['sp'].append(cursor.fetchone()[0])

        if player_type == 'bowler':
            cursor.execute(
                f"SELECT SUM(wickets) AS total_wickets FROM bowling_scorecard WHERE bowler='{name}'")
            player_stat['sp'].append(cursor.fetchone()[0])
            # player_stat['total_wickets'] = cursor.fetchone()[0]

            cursor.execute(
                f"SELECT MAX(CONCAT(wickets, '/', runs_conceded)) AS best_figures FROM player p LEFT JOIN bowling_scorecard b ON p.player_name = b.bowler where bowler = '{name}' GROUP BY p.player_name;")
            player_stat['sp'].append(cursor.fetchone()[0])
            # player_stat['best_figures'] = cursor.fetchone()[0]

            cursor.execute(
                f"SELECT COALESCE(SUM(runs_conceded) / (SUM(overs)),'-') AS bowling_economy FROM bowling_scorecard WHERE bowler='{name}'")
            player_stat['sp'].append(round(float(cursor.fetchone()[0]),2))
            # player_stat['bowling_economy'] = cursor.fetchone()[0]

            cursor.execute(
                f"SELECT COALESCE(SUM(CASE WHEN wickets >= 4 THEN 1 ELSE 0 END), 0) AS four_wicket_haul FROM bowling_scorecard WHERE bowler='{name}'")
            player_stat['sp'].append(cursor.fetchone()[0])
            # player_stat['four_wicket_haul'] = cursor.fetchone()[0]

        if player_type == 'all-rounder':
            cursor.execute(
                f"SELECT COALESCE(SUM(runs),'-') AS total_runs FROM batting_scorecard WHERE batsman='{name}'")
            player_stat['sp'].append(cursor.fetchone()[0])
            # player_stat['total_runs'] = cursor.fetchone()[0]

            cursor.execute(
                f"SELECT COALESCE((SUM(Runs) / SUM(balls_faced)) * 100,'-') AS batting_strike_rate FROM batting_scorecard WHERE batsman='{name}'")
            
            player_stat['sp'].append(round(float(cursor.fetchone()[0]),2))
            # player_stat['batting_strike_rate'] = cursor.fetchone()[0]

            cursor.execute(
                f"SELECT COALESCE(SUM(wickets),'-') AS total_wickets FROM bowling_scorecard WHERE bowler='{name}'")
            player_stat['sp'].append(cursor.fetchone()[0])
            # player_stat['total_wickets'] = cursor.fetchone()[0]

            cursor.execute(
                f"SELECT COALESCE(SUM(runs_conceded) / (SUM(overs)),'-') AS bowling_economy FROM bowling_scorecard WHERE bowler='{name}'")
            player_stat['sp'].append(cursor.fetchone()[0])
            # player_stat['bowling_economy'] = cursor.fetchone()[0]

        player_stats.append(player_stat)

    return JsonResponse(player_stats, safe=False)


@csrf_exempt
def points_table(request):
    if request.method == 'GET':
        # sid = request.POST.get('season_id')
        yr = request.GET.get('year')

        cursor = connection.cursor()

        # with connection.cursor() as cursor:
        # drop existing views, table and procedures if exist
        cursor.execute("drop view winner_temp;")
        cursor.execute("drop view lose_temp;")
        cursor.execute("drop table points_table;")
        cursor.execute("drop procedure loop_all;")

        # create winner_temp view
        cursor.execute("create view winner_temp as \
                        select r.winner as team_name, count(*) as matches_won, 2*count(*) as points \
                        from result r, seasons s, \
                        (select md.* from match_details md, seasons ss where md.season_id \
                        = ss.season_id and ss.year = %s limit 4, 999999999) as m where \
                        r.match_id = m.match_id and s.year = %s group by r.winner;", (yr, yr))

        # create lose_temp view
        cursor.execute("create view lose_temp as \
                        select r.loser as team_name, count(*) as matches_lost \
                        from result r, seasons s, \
                        (select md.* from match_details md, seasons ss where md.season_id \
                        = ss.season_id and ss.year = %s limit 4, 999999999) as m where \
                        r.match_id = m.match_id and s.year = %s group by r.loser;", (yr, yr))

        # create points_table table
        cursor.execute("create table points_table as \
                        select winner_temp.team_name, \
                        winner_temp.matches_won + lose_temp.matches_lost as total_matches, \
                        winner_temp.matches_won, lose_temp.matches_lost, \
                        winner_temp.points, nrr.nrr from winner_temp, nrr, lose_temp, seasons s where \
                        nrr.team_name = winner_temp.team_name and lose_temp.team_name = nrr.team_name \
                        and nrr.season_id = s.season_id and s.year = %s \
                        order by winner_temp.points desc, nrr.nrr desc;", (yr,))

        # alter points_table table
        cursor.execute("alter table points_table add last_match int;")
        cursor.execute("alter table points_table add last_2nd_match int;")
        cursor.execute("alter table points_table add last_3rd_match int;")
        cursor.execute("alter table points_table add last_4th_match int;")
        cursor.execute("alter table points_table add last_5th_match int;")
        cursor.execute("alter table points_table add pos int;")
        cursor.execute("select* from points_table;")
        rows = cursor.fetchall()

        cursor.execute(f"""
        
        CREATE PROCEDURE loop_all ()
        BEGIN
            DECLARE i INT DEFAULT 1;
            DECLARE tname varchar(30);
            WHILE i <= 15 DO
                SELECT team_name INTO tname FROM teams WHERE team_id = i;
                CALL update_last5({yr}, tname);
                SET i = i + 1;
            END WHILE;
        END
        """)
        cursor.execute("SET SQL_SAFE_UPDATES = 0;")
        cursor.execute("SELECT * FROM player;")

        # cursor.execute("DROP PROCEDURE loop_all")

        cursor.execute("CALL loop_all();")
        cursor.execute("SET @position := 0;")
        cursor.execute("UPDATE points_table SET pos = (@position := @position + 1);")
        cursor.execute("select p.*, t.short from points_table p, teams t where t.team_name = p.team_name;")
        rows = cursor.fetchall()

        mapp = { 0: 'L', 1:'W'}
        data = []
        d = dict()
        for row in rows:
            d = {'pos':row[11],
                 'name': row[0], 
                 'img': "https://scores.iplt20.com/ipl/teamlogos/" + str(row[12]) +".png?v=2" ,
                 'matches': row[1],
                 'won': row[2],
                 'lost': row[3],
                 'points': row[4],
                 'nrr': row[5], 
                 }
            lst=[]
            for ind in range(6,11):
                lst.append(mapp[row[ind]])
            d['last']=lst
            data.append(d)
        
        sorted_data=sorted(data,key=lambda d:(d['pos']))
        return JsonResponse(sorted_data, safe=False)


@csrf_exempt
def dual_matches(request):
    if request.method == 'GET':
        team1_name = request.GET.get('team1')
        team2_name = request.GET.get('team2')
        
        cursor = connection.cursor()
        query = ("SELECT md.Match_id,md.Date, md.Match_number, md.Venue, md.Team1, md.Team2, r.Result_details, r.Man_of_match "
                 "FROM match_details md "
                 "JOIN result r ON md.Match_id = r.Match_id "
                 "WHERE (md.Team1 = %s AND md.Team2 = %s) OR (md.Team1 = %s AND md.Team2 = %s)")

        cursor.execute(query, (team1_name, team2_name, team2_name, team1_name))
        rows = cursor.fetchall()
        result_data = []
        d = dict()
        for row in rows:
            d1 = dict()
            d2 = dict()
            cursor.execute(f"""select sc.Match_id, sc.inning_number, sc.name, t.short, sc.total_runs,
sc.total_wickets, sc.total_overs, sc.total_extras_runs, sc.lb, sc.wd, sc.byes, sc.nb
from scorecard sc, teams t, match_details m
 where t.team_name = sc.name and sc.match_id = m.match_id and 
(( m.team1 = '{team1_name}' and m.team2 = '{team2_name}') or
( m.team1 = '{team2_name}' and m.team2 = '{team1_name}')) and sc.Match_id={row[0]}; """)
            rows1 = cursor.fetchall()
            for i in range(len(rows1)):
                if (i == 0):
                    d1 = {
                        'short': rows1[i][3],
                        'name': team1_name,
                        'overs': rows1[i][6],
                        'runs': rows1[i][4],
                        'wickets': rows1[i][5]
                    }
                else:
                    d2 = {
                        'short': rows1[i][3],
                        'name': team2_name,
                        'overs': rows1[i][6],
                        'runs': rows1[i][4],
                        'wickets': rows1[i][5]
                    }

            d3 = dict()
            cursor.execute(f"""select  p.player_name,  bt.runs , bt.balls_faced 
from batting_scorecard bt, player p , result r
where p.player_name = bt.batsman and r.man_of_match = p.player_name
and r.match_id = 1216521 and r.match_id = bt.match_id and
r.man_of_match = 'TA Boult' ;
""")
            batmom = cursor.fetchall()
            cursor.execute(f"""
select  p.player_name, bl.wickets, bl.runs_conceded
from bowling_scorecard bl, player p , result r
where p.player_name = bl.bowler and r.man_of_match = p.player_name
and r.match_id = 1216521 and r.match_id = bl.match_id and
r.man_of_match='TA Boult';
""")
            bowlmom = cursor.fetchall()

            d3 = {
                'name': row[7],
                # 'performmance':str
            }
            d = {
                'id': row[0],
                'date': row[1],
                'match_no': row[2],
                'venue': row[3],
                'result': row[6],
                'team1': d1,
                'team2': d2,

                'man_of_match': d3
            }

            result_data.append(d)

        # Close the cursor
        cursor.close()

        # Format the result data as a JSON object and return it
        # response_data = {'matches': result_data}
        return JsonResponse(result_data, safe=False)


@csrf_exempt
def orange_cap(request):
    if request.method == 'GET':
        orange_cap_list = []
        # yr = request.POST.get('year')
        # body_unicode=request.body.decode('utf-8')
        # body=json.loads(body_unicode)
        yr = request.GET.get('year')
        cursor = connection.cursor()
        cursor.execute(f"""
                       select  season_id, player_name, short, total_runs as max_runs from (
select pts.season_id, t.short, p.player_name, sum(runs) as total_runs from batting_scorecard b,
player p, pts, match_details m, teams t, seasons s where pts.player_id = p.player_id and b.batsman = p.player_name 
and pts.season_id = s.season_id  and s.year = {yr} and m.match_id = b.match_id and m.season_id = pts.season_id 
and pts.team_id = t.team_id group by pts.season_id, b.batsman, t.short) rf GROUP BY season_id, player_name, short
ORDER BY season_id desc, max_runs DESC
LIMIT 15
""")
        rows = cursor.fetchall()
        temp = dict()
        num = 1
        for row in rows:
            temp = {
                # 'season_id': row[0],
                'pos': num,
                'name': row[1],
                'short': row[2],
                'stats': row[3]
            }
            num = num + 1
            orange_cap_list.append(temp)
        print(orange_cap_list)
        # json_data = json.dumps(orange_cap_list)
        return JsonResponse(orange_cap_list, safe=False)


@csrf_exempt
def purple_cap(request):
    if request.method == 'GET':
        purple_cap_list = []
        # yr = request.POST.get('year')
        # body_unicode=request.body.decode('utf-8')
        # body=json.loads(body_unicode)
        yr = request.GET.get('year')
        cursor = connection.cursor()
        cursor.execute(f"""select  season_id, short, player_name, total_wickets as max_wickets from (
select pts.season_id, t.short, p.player_name, sum(wickets) as total_wickets 
from bowling_scorecard b, player p, pts, match_details m, teams t, seasons s where 
pts.player_id = p.player_id and b.bowler = p.player_name and t.team_id = pts.team_id
and pts.season_id = s.season_id and s.year = {yr} and m.match_id = b.match_id and m.season_id = 
pts.season_id group by  s.season_id, b.bowler, t.short) rf GROUP BY season_id, player_name, short
ORDER BY max_wickets DESC
LIMIT 15""")

        rows = cursor.fetchall()
        temp = dict()
        num = 1
        for row in rows:
            temp = {
                # 'season_id': row[0],
                'pos':num,
                'name': row[2],
                'short': row[1],
                'stats': row[3]
            }
            num = num + 1
            purple_cap_list.append(temp)
        print(purple_cap_list)
        # json_data = json.dumps(purple_cap_list)

        return JsonResponse(purple_cap_list, safe=False)


@csrf_exempt
def max_fours(request):
    if request.method == 'GET':
        max_fours_list = []
        # yr = request.POST.get('year')
        # body_unicode=request.body.decode('utf-8')
        # body=json.loads(body_unicode)
        yr = request.GET.get('year')
        cursor = connection.cursor()
        cursor.execute(f"""SELECT season_id, player_name, short, total_fours as max_fours
FROM (
    SELECT pts.season_id, t.short, p.player_name, SUM(b.fours) AS total_fours
    FROM batting_scorecard b, player p, pts, match_details m, teams t, seasons s
    WHERE pts.player_id = p.player_id
        AND b.batsman = p.player_name 
        AND pts.season_id = s.season_id 
        AND s.year ={yr}
        AND m.match_id = b.match_id 
        AND m.season_id = pts.season_id 
        AND pts.team_id = t.team_id 
    GROUP BY pts.season_id, b.batsman, t.short
) rf 
GROUP BY season_id, player_name, short
ORDER BY season_id DESC, max_fours DESC
LIMIT 15;""")

        rows = cursor.fetchall()
        d = dict()
        num = 1
        for row in rows:
            d = {
                # 'season_id': row[0],
                'pos':num,
                'name': row[1],
                'short': row[2],
                'stats': row[3]
            }
            num = num + 1
            max_fours_list.append(d)

        return JsonResponse(max_fours_list, safe=False)


@csrf_exempt
def max_sixes(request):
    if request.method == 'GET':
        max_sixes_list = []
        # yr = request.POST.get('year')
        # body_unicode=request.body.decode('utf-8')
        # body=json.loads(body_unicode)
        yr = request.GET.get('year')
        cursor = connection.cursor()
        cursor.execute(f"""

SELECT season_id, player_name, short, total_sixes as max_sixes
FROM (
    SELECT pts.season_id, t.short, p.player_name, SUM(b.sixes) AS total_sixes
    FROM batting_scorecard b, player p, pts, match_details m, teams t, seasons s
    WHERE pts.player_id = p.player_id
        AND b.batsman = p.player_name 
        AND pts.season_id = s.season_id 
        AND s.year = {yr}
        AND m.match_id = b.match_id 
        AND m.season_id = pts.season_id 
        AND pts.team_id = t.team_id 
    GROUP BY pts.season_id, b.batsman, t.short
) rf 
GROUP BY season_id, player_name, short
ORDER BY season_id DESC, max_sixes DESC
LIMIT 15;
""")

        rows = cursor.fetchall()
        d = dict()
        num = 1
        for row in rows:
            d = {
                # 'season_id': row[0],
                'pos':num,
                'name': row[1],
                'short': row[2],
                'stats': row[3]
            }
            num = num + 1
            max_sixes_list.append(d)

        return JsonResponse(max_sixes_list, safe=False)


@csrf_exempt
def max_strikerate(request):
    if request.method == 'GET':
        max_sr_list = []
        yr = request.GET.get('year')
        cursor = connection.cursor()
        cursor.execute(f"""

SELECT season_id, player_name, short, total_sr as max_sr
FROM (
    SELECT pts.season_id, t.short, p.player_name, sum(b.runs)/sum(b.
    balls_faced)* 100  AS total_sr
    FROM batting_scorecard b, player p, pts, match_details m, teams t, seasons s
    WHERE pts.player_id = p.player_id
        AND b.batsman = p.player_name 
        AND pts.season_id = s.season_id 
        AND s.year = {yr}
        AND m.match_id = b.match_id 
        AND m.season_id = pts.season_id 
        AND pts.team_id = t.team_id 
    GROUP BY pts.season_id, b.batsman, t.short
) rf 
GROUP BY season_id, player_name, short
ORDER BY season_id DESC, max_sr DESC
LIMIT 15;

""")

        rows = cursor.fetchall()
        d = dict()
        num = 1
        for row in rows:
            d = {
                # 'season_id': row[0],
                'pos':num,
                'name': row[1],
                'short': row[2],
                'stats': row[3]
            }
            num = num +1
            max_sr_list.append(d)

        return JsonResponse(max_sr_list, safe=False)


# @csrf_exempt
# def max_highestscore(request):
#     if request.method == 'POST':
#         max_highscore_list = []
#         # yr = request.POST.get('year')
#         body_unicode=request.body.decode('utf-8')
#         body=json.loads(body_unicode)
#         yr = body['year']
#         cursor = connection.cursor()
#         cursor.execute(f"""

# SELECT season_id, player_name, short, MAX(runs) AS max_runs
# FROM (
#     SELECT pts.season_id, t.short, p.player_name, b.runs, m.match_id
#     FROM batting_scorecard b, player p, pts, match_details m, teams t, seasons s
#     WHERE pts.player_id = p.player_id
#         AND b.batsman = p.player_name 
#         AND pts.season_id = s.season_id 
#         AND s.year = {yr} 
#         AND m.match_id = b.match_id 
#         AND m.season_id = pts.season_id 
#         AND pts.team_id = t.team_id 
#     GROUP BY pts.season_id,  b.runs, b.batsman, t.short, m.match_id
# ) rf 
# GROUP BY season_id, runs, player_name, short, match_id
# ORDER BY season_id DESC, max_runs DESC
# LIMIT 15;

# """)

#         rows = cursor.fetchall()
#         d = dict()
#         for row in rows:
#             d = {
#                 # 'season_id': row[0],
#                 'name': row[2],
#                 'short': row[1],
#                 'stats': row[3]
#             }
#             max_highscore_list.append(d)

#         return JsonResponse(max_highscore_list, safe=False)



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
        num = 1
        for row in rows:
            d={
                'pos': num,
                'name':row[1],
                'short':row[2],
                'stats':row[3],
            }
            num = num + 1
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
        num = 1
        for row in rows:
            d={
                'pos': num,
                'name':row[1],
                'short':row[2],
                'stats':round(float(row[3]),2),
            }
            
            num = num + 1
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
        num = 1
        for row in rows:
            d={
                'pos': num,
                'name':row[2],
                'short':row[1],
                'stats':row[3],
                
            }
            num = num + 1
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
        num = 1
        for row in rows:
            d={
                'pos': num,
                
                'name':row[1],
                'short':row[2],
                'stats':row[3],
                
            }
            num = num + 1
            
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
        num = 1
        for row in rows:
            d={
                'pos': num,
                'name':row[2],
                'short':row[1],
                'stats':row[3],
                'year':row[0]
                
            }
            num = num + 1
            highest_runs_all_seasons_list.append(d)
        return JsonResponse(highest_runs_all_seasons_list, safe=False)
    
    
# @csrf_exempt
# def highest_wickets_all_seasons(request):
#     if request.method == 'GET':
#         highest_wickets_all_seasons_list = []
#         cursor = connection.cursor()
#         cursor.execute(f""" SELECT year, short, player_name, max(total_wickets) as max_wickets
# FROM (
#     SELECT s.year, t.short, p.player_name, max(b.wickets) as total_wickets
#     FROM bowling_scorecard b
#     JOIN player p ON b.bowler = p.player_name
#     JOIN pts ON pts.player_id = p.player_id
#     JOIN match_details m ON m.match_id = b.match_id AND m.season_id = pts.season_id
#     JOIN teams t ON t.team_id = pts.team_id
#     JOIN seasons s ON pts.season_id = s.season_id

#     GROUP BY b.bowler, t.short, s.year
# ) AS rf
# GROUP BY short, player_name, year
# ORDER BY max_wickets DESC
# LIMIT 15;
# """)
#         rows=cursor.fetchall()
#         d=dict()
#         num = 1
#         for row in rows:
#             d={
#                 'pos': num,
#                 'name':row[2],
#                 'short':row[1],
#                 'stats':row[3],
                
#             }
#             num = num + 1
#             highest_wickets_all_seasons_list.append(d)
#         return JsonResponse(highest_wickets_all_seasons_list, safe=False)
        
@csrf_exempt
def highest_chased_runs(request):
    if request.method == 'GET':
        highest_chased_runs_list = []
        cursor = connection.cursor()
        cursor.execute(f""" 
select  t.team_name ,t.short, r.loser, t1.short , s.total_runs from scorecard s, teams t, teams t1, result r where t.team_name = s.name and 
s.inning_number = 2 and r.match_id = s.match_id  and r.winner = t.team_name and r.loser = t1.team_name order by total_runs desc limit 15

""")
        rows=cursor.fetchall()
        print(f"hello : {rows}")
        d=dict()
        num = 1
        for row in rows:
            d={
                'pos': num,
                'name': row[0],
                'short':row[1],
                'oppose':row[3],
                'stats':row[4]
                
            }
            num = num + 1
            print(f"hello : {d}")
            highest_chased_runs_list.append(d)
        return JsonResponse(highest_chased_runs_list, safe=False)
    

@csrf_exempt
def highest_team_runs(request):
    if request.method == 'GET':
        highest_team_runs_list = []
        cursor = connection.cursor()
        cursor.execute(f""" 
select  t.team_name ,t.short, r.loser, t1.short , s.total_runs from scorecard s, teams t, teams t1, result r where t.team_name = s.name
and r.match_id = s.match_id  and r.winner = t.team_name and r.loser = t1.team_name order by total_runs desc limit 15

""")
        rows=cursor.fetchall()
        d=dict()
        num = 1
        for row in rows:
            d={
                
                'pos':num,
                'name': row[0],
                'short':row[1],
                'oppose':row[3],
                'stats':row[4]
                
            }
            num = num + 1
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
 where t.team_name = sc.name and sc.match_id = m.match_id and sc.match_id = '{match_now}'order by inning_number asc """)
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
                            'dismissal':  dismissal
                        }
                        
                        if batsman[7] is None:
                            d1['sr']='--'
                        else:
                            d1['sr']=round(float(batsman[7]),2)
                        
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
                         'totalextras': extras[0][0],
                         'extrasinfo':"( "+"B: "+str(extras[0][3])+" ,LB: "+str(extras[0][1])+" ,NB: "+str(extras[0][4])+" ,W: "+str(extras[0][2])+" )",
                        'fallofwickets': fow_list,
                    }
                    
                    if (i == 1):
                        d.append({
                            'name': name1,
                            'short': short1,
                            'totalruns': runs1,
                            'totalwickets': wickets1,
                            'overs': overs1,
                            'batting': d1_list,
                            'bowling': d2_list
                              
                        })
                    else:
                        
                        d.append({
                            'name': name2,
                            'short': short2,
                            'totalruns': runs2,
                            'totalwickets': wickets2,
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