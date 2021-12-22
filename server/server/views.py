from django.shortcuts import render

def index(request):
  return render(request, 'index.html', {
    'page_name': 'Tumssum',
  })

def login(request):
  return render(request, 'index.html', {
    'page_name': 'Login',
  })

def register(request):
  return render(request, 'index.html', {
    'page_name': 'Register',
  })

def confirm(request):
  return render(request, 'index.html', {
    'page_name': 'Tumssum',
  })

def settings(request):
  return render(request, 'index.html', {
    'page_name': 'Settings',
  })

def category(request):
  return render(request, 'index.html', {
    'page_name': 'Category',
  })

def bank(request):
  return render(request, 'index.html', {
    'page_name': 'Bank',
  })

def budget(request):
  return render(request, 'index.html', {
    'page_name': 'Budget',
  })

def profileDetail(request, id):
  return render(request, 'index.html', {
    'page_name': 'Profile | ' + id
  })