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

def profile(request):
  return render(request, 'index.html', {
    'page_name': 'Profile',
  })

def profileDetail(request, id):
  return render(request, 'index.html', {
    'page_name': 'Profile | ' + id
  })