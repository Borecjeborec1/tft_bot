import tkinter
import math
import json
canvas = tkinter.Canvas(width=1000, height=800)
canvas.pack()

file1 = open("capture.txt")
arr = json.load(file1)


def get_col(rgb):
    r, g, b = rgb
    return f'#{r:02x}{g:02x}{b:02x}'


image_size = math.floor(math.sqrt(len(arr) / 4))
for (i, j) in enumerate(arr):
    if i % 4 == 0:
        col = (i / 4) % image_size
        row = (i / 4) // image_size
        color = get_col([arr[i - 2], arr[i - 3], arr[i - 4]])
        canvas.create_rectangle(
            col, row, col + 1, row + 1, fill=color, outline="")


canvas.mainloop()
