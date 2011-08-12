from lettuce import before, step, world
from lettuce.django import django_url
from splinter.browser import Browser

from nose.tools import assert_true

@before.all
def set_browser():
    world.browser = Browser()

@step(u'I access the url "(.*)"')
def given_i_access_the_url(step, url):
    full_url = django_url(url)
    world.browser.visit(full_url)

    assert_true(world.browser.status_code.is_success())

@step(u'I see the header "(.*)"')
def then_i_see_the_header(step, header):
    assert_true(world.browser.is_text_present(header))
