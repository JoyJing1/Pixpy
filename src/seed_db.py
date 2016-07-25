from django_seed import Seed
from django.conf import settings
import datetime
import os
import seed_imgs

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
DEBUG = False
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite'),  # NOQA (ignore all errors on this line)
    }
}

settings.configure(DATABASES=DATABASES, DEBUG=DEBUG)

from albums.models import Album, Photo

seeder = Seed.seeder()

#       FLOWERS     ###############################################################

Album.objects.create(
    title = 'Flowers and Fauna',
    description = "Roses are red, Violets are blue, I love Django, don't you?",
    image_url = seed_imgs.FLOWERS[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.FLOWERS:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )

#       PANDAS     ###############################################################

Album.objects.create(
    title = 'Pandas',
    description = "He's a panda! You're a panda! What are you gonna do, big guy? Sit on me?",
    image_url = seed_imgs.PANDAS[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.PANDAS:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )

#       CHICKS     ###############################################################

Album.objects.create(
    title = 'Chicks',
    description = "The closest living relatives of the T. Rex.  Aren't they fearsome?",
    image_url = seed_imgs.CHICKS[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.CHICKS:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )

#       CATS     ###############################################################

Album.objects.create(
    title = 'Kitties and Kats',
    description = 'It is a very inconvenient habit of kittens that whatever you say to them, they always purr.',
    image_url = seed_imgs.CATS[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.CATS:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )

#       DOGS     ###############################################################

Album.objects.create(
    title = "Dog Days",
    description = 'Every dog has his day, unless he loses his tail, then he has a weak-end.',
    image_url = seed_imgs.DOGS[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.DOGS:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )

#       PENGUINS        ###############################################################

Album.objects.create(
    title = 'Penguins',
    description = "It's pretty much impossible to look at a penguin and be mad.",
    image_url = seed_imgs.PENGUINS[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.PENGUINS:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )

#       PIGS        ####################################################
Album.objects.create(
    title = 'Piglets and Piggies',
    description = 'You have been my friend. That in itself is a tremendous thing. I wove my webs for you because I liked you.',
    image_url = seed_imgs.PIGS[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.PIGS:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )

#       BIRDS        ####################################################
Album.objects.create(
    title = 'Birds of a Feather',
    description = "The reason birds can fly and we can't is simply because they have perfect faith, for to have faith is to have wings.",
    image_url = seed_imgs.BIRDS[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.BIRDS:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )

#       RABBITS        ####################################################
Album.objects.create(
    title = 'Bunnies',
    description = "I have always wanted a bunny and I'll always have a rabbit for the rest of my life.",
    image_url = seed_imgs.RABBITS[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.RABBITS:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )
#       OTTERS        ####################################################
Album.objects.create(
    title = 'Otters',
    description = "The more 'otter it is, the more 'otter otters likes it",
    image_url = seed_imgs.OTTERS[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.OTTERS:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )

#       SCUBA        ####################################################
Album.objects.create(
    title = 'Underwater Adventures',
    description = "If you ever go scuba diving in Cozumel, Mexico, make sure to dive Devil's Throat - 40 meters and the coolest coral tunnel you've ever experienced! Also, Cenotes. Because Haloclines.",
    image_url = seed_imgs.SCUBA[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.SCUBA:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )

#       SNOW        ####################################################
Album.objects.create(
    title = 'Snow Sports',
    description = 'Snowboarding is an activity that is very popular with people who do not feel that regular skiing is lethal enough.',
    image_url = seed_imgs.SNOW[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.SNOW:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )

#       SURFING        ####################################################
Album.objects.create(
    title = "Surf's Up!",
    description = "Wiping out is an underappreciated skill.",
    image_url = seed_imgs.SURFING[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.SURFING:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )

#       BEACH        ####################################################
Album.objects.create(
    title = 'Beach Vacation',
    description = 'The sun shines everywhere, not just at the beach.',
    image_url = seed_imgs.BEACH[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.BEACH:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )

#       POKEMON, CARTOONS        ################################
Album.objects.create(
    title = 'Pokemon',
    description = "Gotta catch 'em all! (just don'w walk off any cliffs)",
    image_url = seed_imgs.POKEMON[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.POKEMON:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )

for img_url in seed_imgs.CARTOONS:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )

#       BUBBLES, KOALAS, GIRAFFES        ##########################
# Album.objects.create(
#     title = 'Piglets and Piggies',
#     description = 'Pigs are both the smartest as well as one of the cutest mammals around',
#     image_url = seed_imgs.PIGS[0],
#     upload_date = datetime.datetime.now()
# )
#
# album = Album.objects.last()
#
# for img_url in seed_imgs.PIGS:
#     Photo.objects.create(
#         image_url = img_url,
#         caption = seeder.faker.sentence(nb_words=6),
#         album = album,
#         upload_date = datetime.datetime.now()
#     )

#       CAPYBARA        ####################################################
Album.objects.create(
    title = 'Capybara',
    description = 'A large rodent native to South America that helps you test web applications by simulating how a real user would interact with your app',
    image_url = seed_imgs.CAPYBARA[0],
    upload_date = datetime.datetime.now()
)

album = Album.objects.last()

for img_url in seed_imgs.CAPYBARA:
    Photo.objects.create(
        image_url = img_url,
        caption = seeder.faker.sentence(nb_words=6),
        album = album,
        upload_date = datetime.datetime.now()
    )
