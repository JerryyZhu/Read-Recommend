import csv, random

from api.models import Book, Genre

publishers = ['Penguin', 'Hachette Book Group', 'Harper Collins', 'Simon and Schuster', 'Macmillan']

tags = set()

with open('cleaner.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in list(csv_reader)[1:]:
        tags.update(row[24].split(','))
print(tags)

for tag in tags:
    Genre.objects.create(name=tag)

with open('cleaner.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in list(csv_reader)[:500]:
        try:
            book = Book.objects.create(
                title=row[10],
                author=row[8],
                publication_year=int(float(row[9])),
                publisher=publishers[random.randint(0, len(publishers)-1)],
                number_reads=0,
                description=f"{row[10]} was written by {row[8]} in {int(float(row[9]))}.",
                word_count=random.randint(10000, 100000),
                url=row[22],
            )

            book.genre.set(Genre.objects.filter(name__in=row[24].split(',')))
        except:
            print('error')