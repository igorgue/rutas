from lettuce import after, before, step, world
from lettuce.django import django_url
from nose.tools import assert_equal, assert_true
from splinter.browser import Browser
from termcolor import cprint

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
    assert_equal(world.browser.find_by_css('h1').first.value, header)

@after.all
def unset_browser(total):
    message = "{0} of {1} scenarios passed!".format(
        total.scenarios_passed,
        total.scenarios_ran
    )

    if total.scenarios_ran == total.scenarios_passed:
        cprint("Congratulations! {0}".format(message), 'green')
    else:
        cprint("FAIL! {0}".format(message), 'red')

    world.browser.quit()
