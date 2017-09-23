---
title: Connect
content:
    items: '@self.modular'
    order:
        by: date
        dir: desc
seo_title: 'Connect w/ Jeff Wilkerson - Portland, OR - Front End Web Developer'
seo_description: 'Looking to connect with web designers, content specialists, etc in Portland, Oregon area. Web Developer wanting to create websites'
sharing_title: 'Connect w/ Jeff Wilkerson - Portland, OR - Front End Web Developer'
sharing_description: 'Content Management, Front End Development, Javascript, I do it all. Contact me  today!'
body_classes: modular
sharing_image:
    user/pages/06.connect/jeff-wilkerson-html-js-css-guy.jpg:
        name: jeff-wilkerson-html-js-css-guy.jpg
        type: image/jpeg
        size: 194737
        path: user/pages/06.connect/jeff-wilkerson-html-js-css-guy.jpg
form:
    name: my-nice-form
    action: /connect
    classes: form-horizontal
    fields:
        -
            name: fullname
            id: fullname
            label: false
            classes: 'form-control form-control-lg'
            placeholder: 'Enter your name'
            autocomplete: 'on'
            type: text
            validate:
                required: true
        -
            name: email
            id: email
            classes: 'form-control form-control-lg'
            label: false
            placeholder: 'Enter your email address'
            type: email
            validate:
                rule: email
                required: true
        -
            name: message
            label: false
            classes: 'form-control form-control-lg'
            size: long
            placeholder: 'Enter your message'
            type: textarea
            validate:
                required: true
        -
            name: g-recaptcha-response
            label: false
            type: captcha
            recaptcha_site_key: 6LdCiSEUAAAAAOW-5Q6zy1nQifMd3N_p8f-mZ0j3
            recaptcha_not_validated: 'Captcha not valid!'
            validate:
                required: false
    buttons:
        -
            type: submit
            value: Submit
            classes: 'btn btn-primary'
    process:
        -
            captcha:
                recaptcha_secret: 6LdCiSEUAAAAALaAxx_XaPUDC5ybfImjHal_ZlzK
        -
            email:
                from:  '{{ form.value.email }}'
                to: '{{ config.plugins.email.from }}'
                subject: '[Feedback] {{ form.value.name|e }}'
                body: '{% include ''forms/data.html.twig'' %}'
        -
            save:
                fileprefix: feedback-
                dateformat: Ymd-His-u
                extension: txt
                body: '{% include ''forms/data.txt.twig'' %}'
        -
            message: 'Thank you for your feedback!'
        -
            display: thankyou
---

