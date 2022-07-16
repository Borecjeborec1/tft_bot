from PIL import Image
from os import listdir
for imagePath in listdir("images/items/"):
    imageName = imagePath.replace(".jpg", "")
    image = Image.open(r"images/items/" + imageName + ".jpg")

    data = image.getdata()

    counter = 0
    ar = []

    for (i, j) in enumerate(data):
        if i // image.size[0] == image.size[0] / 2:
            ar.append(j[2])
            ar.append(j[1])
            ar.append(j[0])
            ar.append(255)

    file1 = open(r"data/items/" + imageName + ".txt", 'w')
    file1.write(str(ar))
    file1.close()
