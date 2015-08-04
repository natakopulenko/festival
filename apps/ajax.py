# coding=utf-8
from django.http import HttpResponseBadRequest, JsonResponse, HttpResponse
from django.views.generic import View
from core.utils import angular_post_parameters
from datetime import datetime
from django.core.mail import send_mail


class CountView(View):
    class PostCodes(object):
        @classmethod
        def invalid_parameter(cls, parameter_name):
            return HttpResponseBadRequest('parameter {0} is invalid'.format(parameter_name))

        @classmethod
        def ok(cls, time):
            return JsonResponse({'code': 0,
                                 'message': 'OK',
                                 'data': {
                                     'days': time['days'],
                                     'hours': time['hours'],
                                     'minutes': time['minutes'],
                                     'seconds': time['seconds'],
                                 }})

    def get(self, request):
        from_date = datetime(2015, 8, 20, 15, 0, 0, 0)
        date_now = datetime.now()
        time_delta = from_date-date_now
        if time_delta.days < 0:
            return self.PostCodes.ok({'days': 0, 'hours': 0, 'minutes': 0, 'seconds': 0})
        time = {}
        time['days'] = time_delta.days
        hours = int(time_delta.seconds / 3600)
        time['hours'] = hours
        if time['hours'] < 0:
            time['hours'] = 0
        minutes = int((time_delta.seconds - hours*3600) / 60)
        time['minutes'] = minutes
        time['seconds'] = time_delta.seconds - minutes*60 - hours*3600
        return self.PostCodes.ok(time)


class RegisterView(View):

    class PostCodes(object):
        @classmethod
        def invalid_parameter(cls, parameter_name):
            return HttpResponseBadRequest('parameter {0} is invalid'.format(parameter_name))

        @classmethod
        def ok(cls, name):
            return JsonResponse({'code': 0,
                                 'message': 'OK',
                                 'data': {
                                     'name': name,
                                 }})

    def post(self, request):
        try:
            parameters = angular_post_parameters(request,
                                                 ['name', 'number', 'paint'])
        except ValueError:
            return self.PostCodes.invalid_parameter('all')
        if not parameters['name']:
            return self.PostCodes.invalid_parameter('name')
        if not parameters['number']:
            return self.PostCodes.invalid_parameter('number')
        if not parameters['paint']:
            return self.PostCodes.invalid_parameter('paint')

        send_mail('Реєстрація на фестиваль', u'Доброго дня, мене звати ' + unicode(parameters['name']) +
                  u'.Я бажаю зареєструватись на фестиваль "Холі". Мій номер телефону: ' + unicode(parameters['number']) +
                  u'. Кількість фарби: ' + unicode(parameters['paint']), 'natali.kopilenko@mail.ru',
                  ['natali.kopilenko@mail.ru'], fail_silently=False)
        return self.PostCodes.ok(parameters['name'])