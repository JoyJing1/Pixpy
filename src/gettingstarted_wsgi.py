"""
WSGI config for Pixpy project.

"""

import os
print(os)
print("making it to line 8")
# print(sys.path)
# print(os.environ)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djangoreactredux.settings.prod")
print("making it to line 10")
print(os.environ)

from django.core.wsgi import get_wsgi_application
print("making it to line 14")

from whitenoise.django import DjangoWhiteNoise
print("making it to line 17")

application = get_wsgi_application()
print("making it to line 20")

# application = DjangoWhiteNoise(application)
print("making it to line 23")
