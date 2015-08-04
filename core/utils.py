import json


def angular_post_parameters(request, required_parameters=None):
    if not request.body:
        if required_parameters:
            raise ValueError()
        else:
            return {}

    if request.method == 'POST':
        parameters = json.loads(request.body)
        if required_parameters:
            for param in required_parameters:
                if not param in parameters:
                    raise ValueError('Required parameter '+str(param)+' is absent.')

                if parameters[param] == '':
                    raise ValueError('Parameter '+str(param)+' is empty.')
        return parameters

    else:
        # request method is not POST
        raise ValueError('Invalid request method type')