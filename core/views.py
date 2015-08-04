from django.http import HttpResponse
from django.template.loader import get_template


def home(request):
    template = get_template('index.html')
    return HttpResponse(template.render())


def landing(request):
    template = get_template('landing.html')
    return HttpResponse(template.render())
