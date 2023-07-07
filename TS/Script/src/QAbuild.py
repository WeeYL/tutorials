main_folder = 'C:\\Users\\leon.wee.yuan.liang\\OneDrive - Accenture\\Desktop\\tutorials\\'

# REPLACE TEXT
search_file = main_folder+'\\TS\\Script\\src\\app-04-advancedTS.ts'
search_text = '''
type ToFlag<T> = {[Property in keyof T]: boolean}

type PlayMovieFlag = ToFlag<PlayMovies>
const playMyMovies:PlayMovieFlag = {playFantasyMovie:false,paid:true}
console.log(`MAPPED ${playMyMovies.playFantasyMovie} ${playMyMovies.paid}`)

'''
replace_text = "replaced"


def textToReplace(search_file,search_text,replace_text):
	with open(search_file, 'r') as file:
		data = file.read()
		data = data.replace(search_text, replace_text)

	with open(search_file, 'w') as file:
		file.write(data)

	print("Text replaced")

# textToReplace(search_file,search_text,replace_text)

# COPY FILES
import shutil

src = main_folder+'TS_ReactNative\\assets\\adaptive-icon.png'
dst = main_folder+'TS\\Script\\src'
# shutil.copy(src, dst)  

# RUN CMD LINE

import subprocess
subprocess.call('git add .', shell=True)
subprocess.call('git commit -m "py"', shell=True)