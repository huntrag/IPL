"""Defines URL patterns for learning_logs."""
from django.urls import path
from . import views
app_name = 'learning_logs'
urlpatterns = [
 # Home page
path('featured_players/', views.featured_players_func, name='featured_players'),
path('points_table/', views.points_table, name='points_table'),
path('dual_matches/',views.dual_matches,name='dual_matches'),
path('stats/orange_cap/',views.orange_cap,name='orange_cap'),
path('stats/purple_cap/',views.purple_cap,name='purple_cap'),
path('stats/max_fours/',views.max_fours,name='max_fours'),
path('stats/max_sixes/',views.max_sixes,name='max_sixes'),
path('stats/max_strikerate/',views.max_strikerate,name='max_strikerate'),
# path('stats/max_highestscore/',views.max_highestscore,name='max_highscore'),
path('stats/all_matches/',views.all_matches,name='all_matches'),
path('stats/most_dots/',views.most_dots,name='most_dots'),
path('stats/best_economy/',views.best_economy,name='best_economy'),
path('stats/max_wickets_in_innings/',views.max_wickets_in_innings,name='max_wickets_in_innings'),
path('stats/highest_runs_in_innings/',views.highest_runs_in_innings,name='highest_runs_in_innings'),
path('stats/highest_runs_all_seasons/',views.highest_runs_all_seasons,name='highest_runs_all_seasons'),
# path('stats/highest_wickets_all_seasons/',views.highest_wickets_all_seasons,name='highest_wickets_all_seasons'),
path('stats/highest_team_runs/',views.highest_team_runs,name='highest_team_runs'),
path('stats/highest_chased_runs/',views.highest_chased_runs,name='highest_chased_runs'),
path('test_api/',views.test_api,name='test_api'),
]