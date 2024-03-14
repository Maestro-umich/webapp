"""Maestro player"""
import pygame
import time
import os
import random
import maestro

import pathlib
MAESTRO_ROOT = str(pathlib.Path(__file__).resolve().parent)
SHEET_MUSIC_FOLDER = MAESTRO_ROOT + '/maestro/' + 'sheetMusicPhotos'

"""0-6 is major, 7-13 is minor"""
CMajor_Aminor_01 = {
    0: "C",
    1: "Dm",
    2: "Em",
    3: "F",
    4: "G",
    5: "Am",
    6: "Bdim",

    7: "Am",
    8: "Bdim",
    9: "C",
    10: "Dm",
    11: "Em",
    12: "F",
    13: "G"
}

DbMajor_Bbminor_02 = {
    0: "Db",
    1: "Ebm",
    2: "Fm",
    3: "Gb",
    4: "Ab",
    5: "Bbm",
    6: "Cdim",

    7: "Bbm",
    8: "Cdim",
    9: "Db",
    10: "Ebm",
    11: "Fm",
    12: "Gb",
    13: "Ab"
}

DMajor_Bminor_03 = {
    0: "D",
    1: "Em",
    2: "F#m",
    3: "G",
    4: "A",
    5: "Bm",
    6: "C#dim",

    7: "Bm",
    8: "C#dim",
    9: "D",
    10: "Em",
    11: "F#m",
    12: "G",
    13: "A"
}

EbMajor_Cminor_04 = {
    0: "Eb",
    1: "Fm",
    2: "Gm",
    3: "Ab",
    4: "Bb",
    5: "Cm",
    6: "Ddim",

    7: "Cm",
    8: "Ddim",
    9: "Eb",
    10: "Fm",
    11: "Gm",
    12: "Ab",
    13: "Bb"
}

EMajor_CSHARPminor_05 = {
    0: "E",
    1: "F#m",
    2: "G#m",
    3: "A",
    4: "B",
    5: "C#m",
    6: "D#dim",

    7: "C#m",
    8: "D#dim",
    9: "E",
    10: "F#m",
    11: "G#m",
    12: "A",
    13: "B"
}

EMajor_CSHARPminor_05 = {
    0: "E",
    1: "F#m",
    2: "G#m",
    3: "A",
    4: "B",
    5: "C#m",
    6: "D#dim",

    7: "C#m",
    8: "D#dim",
    9: "E",
    10: "F#m",
    11: "G#m",
    12: "A",
    13: "B"
}

FMajor_Dminor_06 = {
    0: "F",
    1: "Gm",
    2: "Am",
    3: "Bb",
    4: "C",
    5: "Dm",
    6: "Edim",

    7: "Dm",
    8: "Edim",
    9: "F",
    10: "Gm",
    11: "Am",
    12: "Bb",
    13: "C"
}

GbMajor_Ebminor_07 = {
    0: "Gb",
    1: "Abm",
    2: "Bbm",
    3: "Cb",
    4: "Db",
    5: "Ebm",
    6: "Fdim",

    7: "Ebm",
    8: "Fdim",
    9: "Gb",
    10: "Abm",
    11: "Bbm",
    12: "Cb",
    13: "Db"
}

GMajor_Eminor_08 = {
    0: "G",
    1: "Am",
    2: "Bm",
    3: "C",
    4: "D",
    5: "Em",
    6: "F#dim",

    7: "Em",
    8: "F#dim",
    9: "G",
    10: "Am",
    11: "Bm",
    12: "C",
    13: "D"
}

AbMajor_Fminor_09 = {
    0: "Ab",
    1: "Bbm",
    2: "Cm",
    3: "Db",
    4: "Eb",
    5: "Fm",
    6: "Gdim",

    7: "Fm",
    8: "Gdim",
    9: "Ab",
    10: "Bbm",
    11: "Cm",
    12: "Db",
    13: "Eb"
}

AMajor_FSHARPminor_10 = {
    0: "A",
    1: "Bm",
    2: "C#m",
    3: "D",
    4: "E",
    5: "F#m",
    6: "G#dim",

    7: "F#m",
    8: "G#dim",
    9: "A",
    10: "Bm",
    11: "C#m",
    12: "D",
    13: "E"
}

BbMajor_Gminor_11 = {
    0: "Bb",
    1: "Cm",
    2: "Dm",
    3: "Eb",
    4: "F",
    5: "Gm",
    6: "Adim",

    7: "Gm",
    8: "Adim",
    9: "Bb",
    10: "Cm",
    11: "Dm",
    12: "Eb",
    13: "F"
}


BMajor_GSHARPminor_12 = {
    0: "B",
    1: "C#m",
    2: "D#m",
    3: "E",
    4: "F#",
    5: "G#m",
    6: "A#dim",

    7: "G#m",
    8: "A#dim",
    9: "B",
    10: "C#m",
    11: "D#m",
    12: "E",
    13: "F#"
}

FolderIndex = {
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

FolderMap = {
    "01-CMajor-Aminor" : CMajor_Aminor_01,
    "02-DbMajor-Bbminor": DbMajor_Bbminor_02,
    "03-DMajor-Bminor": DMajor_Bminor_03,
    "04-EbMajor-Cminor": EbMajor_Cminor_04,
    "05-EMajor-C#minor": EMajor_CSHARPminor_05,
    "06-FMajor-Dminor": FMajor_Dminor_06,
    "07-GbMajor-Ebminor": GbMajor_Ebminor_07,
    "08-GMajor-Eminor": GMajor_Eminor_08,
    "09-AbMajor-Fminor": AbMajor_Fminor_09,
    "10-AMajor-F#minor": AMajor_FSHARPminor_10,
    "11-BbMajor-Gminor": BbMajor_Gminor_11,
    "12-BMajor-G#minor": BMajor_GSHARPminor_12,
}


def random_selector():
    """Randomly selects which chords to play"""
    #TODO:: move constants to config file
    n = random.randint(0, 11)
    files = random.randint(0, 13)
    randFile = FolderMap[FolderIndex[n]][files]
    triad_type = ""
    if files < 7 :
        triad_type = "Major"
    else:
        triad_type = "Minor"
    file_path = MAESTRO_ROOT + f"MIDI/{FolderIndex[n]}/Triad/{triad_type}/{randFile}.mid"
    play_chord(file_path)


def play_chord(file_path):
    """Plays chords from midi file"""
    try:
        pygame.init()
        pygame.mixer.init()
        #check if pygame.load() is supposed to be string or path
        pygame.mixer.music.load(file_path)
        pygame.mixer.music.play()
        while pygame.mixer.music.get_busy():
            pygame.time.wait(1000)  # Wait for 1 second (Not needed, but basically
            #stops the function from checking for the end of the song as much as possible, makes it once a second)
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    # Replace 'your_file.mid' with the path to your MIDI file
    count = 0
    while (count < 20):
        random_selector()
        count += 1