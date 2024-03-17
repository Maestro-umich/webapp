from flask import Flask, render_template, request, jsonify, send_file
import random

app = Flask(__name__)

class GameView:
    def __init__(self):
        # Initialize member variables
        self.file_path = None
        self.randFile = None
        self.CMajor_Aminor_01 = { 
            0: "C",
            1: "Dm",
            2: "Em",
            3: "F",
            4: "G",
            5: "Am",
            6: "Bdim",
        }

        self.DbMajor_Bbminor_02 = {
            0: "Db",
            1: "Ebm",
            2: "Fm",
            3: "Gb",
            4: "Ab",
            5: "Bbm",
            6: "Cdim",
        }

        self.DMajor_Bminor_03 = {
            0: "D",
            1: "Em",
            2: "F#m",
            3: "G",
            4: "A",
            5: "Bm",
            6: "C#dim",
        }

        self.EbMajor_Cminor_04 = {
            0: "Eb",
            1: "Fm",
            2: "Gm",
            3: "Ab",
            4: "Bb",
            5: "Cm",
            6: "Ddim",
        }

        self.EMajor_CSHARPminor_05 = {
            0: "E",
            1: "F#m",
            2: "G#m",
            3: "A",
            4: "B",
            5: "C#m",
            6: "D#dim",
        }

        self.EMajor_CSHARPminor_05 = {
            0: "E",
            1: "F#m",
            2: "G#m",
            3: "A",
            4: "B",
            5: "C#m",
            6: "D#dim",
        }

        self.FMajor_Dminor_06 = {
            0: "F",
            1: "Gm",
            2: "Am",
            3: "Bb",
            4: "C",
            5: "Dm",
            6: "Edim",
        }

        self.GbMajor_Ebminor_07 = {
            0: "Gb",
            1: "Abm",
            2: "Bbm",
            3: "Cb",
            4: "Db",
            5: "Ebm",
            6: "Fdim",
        }

        self.GMajor_Eminor_08 = {
            0: "G",
            1: "Am",
            2: "Bm",
            3: "C",
            4: "D",
            5: "Em",
            6: "F#dim",
        }

        self.AbMajor_Fminor_09 = {
            0: "Ab",
            1: "Bbm",
            2: "Cm",
            3: "Db",
            4: "Eb",
            5: "Fm",
            6: "Gdim",
        }

        self.AMajor_FSHARPminor_10 = {
            0: "A",
            1: "Bm",
            2: "C#m",
            3: "D",
            4: "E",
            5: "F#m",
            6: "G#dim",
        }

        self.BbMajor_Gminor_11 = {
            0: "Bb",
            1: "Cm",
            2: "Dm",
            3: "Eb",
            4: "F",
            5: "Gm",
            6: "Adim",
        }


        self.BMajor_GSHARPminor_12 = {
            0: "B",
            1: "C#m",
            2: "D#m",
            3: "E",
            4: "F#",
            5: "G#m",
            6: "A#dim",
        }

        self.FolderIndex = {
            0: "01-CMajor-Aminor",
            1: "02-DbMajor-Bbminor",
            2: "03-DMajor-Bminor",
            3: "04-EbMajor-Cminor",
            4: "05-EMajor-C#minor",
            5: "06-FMajor-Dminor",

            6: "07-GbMajor-Ebminor",
            7: "08-GMajor-Eminor",
            8: "09-AbMajor-Fminor",
            9: "10-AMajor-F#minor",
            10: "11-BbMajor-Gminor",
            11: "12-BMajor-G#minor",
        }

        self.FolderMap = {
            "01-CMajor-Aminor" : self.CMajor_Aminor_01,
            "02-DbMajor-Bbminor": self.DbMajor_Bbminor_02,
            "03-DMajor-Bminor": self.DMajor_Bminor_03,
            "04-EbMajor-Cminor": self.EbMajor_Cminor_04,
            "05-EMajor-C#minor": self.EMajor_CSHARPminor_05,
            "06-FMajor-Dminor": self.FMajor_Dminor_06,
            "07-GbMajor-Ebminor": self.GbMajor_Ebminor_07,
            "08-GMajor-Eminor": self.GMajor_Eminor_08,
            "09-AbMajor-Fminor": self.AbMajor_Fminor_09,
            "10-AMajor-F#minor": self.AMajor_FSHARPminor_10,
            "11-BbMajor-Gminor": self.BbMajor_Gminor_11,
            "12-BMajor-G#minor": self.BMajor_GSHARPminor_12,
        }

    def index(self):
        return render_template('index.html')

    def game(self):
        return render_template('game.html')

    def question_selector(self):
        """Randomly selects which chords to play"""
        n = random.randint(0, 11)
        files = random.randint(0, 6)
        self.randFile = self.FolderMap[self.FolderIndex[n]][files]
        self.randFile = self.randFile.replace('#', '%23') #to avoid fragmenting URL
        self.file_path = f"static/MIDI/norm-level/{self.FolderIndex[n]}/Triad/Major/{self.randFile}.mp3"
        self.file_path = self.file_path.replace('#', '%23') #to avoid fragmenting URL
        return jsonify({"correct_ans": self.randFile, "file_path": self.file_path})

    def play_chord(self):
        """Plays chords from midi file"""
        try:
            file_path = self.file_path
            return send_file(file_path, as_attachment=True, mimetype='audio/midi')
        except Exception as e:
            return str(e), 500
        

# Register routes with class-based views
game_view = GameView()
app.add_url_rule('/', view_func=game_view.index)
app.add_url_rule('/game', view_func=game_view.game)
app.add_url_rule('/question_selector', view_func=game_view.question_selector, methods=['GET'])
app.add_url_rule('/play_chord', view_func=game_view.play_chord, methods=['GET'])

if __name__ == "__main__":
    # Replace 'your_file.mid' with the path to your MIDI file
    app.run(debug=True)