from django_seed import Seed
from django.conf import settings
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
DEBUG = False
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite'),  # NOQA (ignore all errors on this line)
    }
}
#
settings.configure(DATABASES=DATABASES, DEBUG=DEBUG)
seeder = Seed.seeder()
#
from albums.models import Album, Photo
# from seed_db import
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djangoreactredux.settings.prod")


seeder.add_entity(Album, 1, {
    'title':    "Seed_db.py Two",
    'description': "Description from seed_db.py",
    'image_url': "http://res.cloudinary.com/joyjing1/image/upload/v1469394597/friendex_imgs/sgqhwhzlj6m6ad69xyxu.jpg",
})

seeder.execute()



#
# seeder.add_entity(Game, 5)
# seeder.add_entity(Player, 10)
#
# inserted_pks = seeder.execute()

# seeder.add_entity(Album, 10, {
#     'title':    lambda x: random.randint(0,1000),
#     'description': lambda x: seeder.faker.email(),
# })
