from django.shortcuts import render

def index(request):
  return render(request, 'index.html', {
    'page_name': 'Tumssum',
  })

def profile(request):
  return render(request, 'index.html', {
    'page_name': 'Profile',
  })

def profileDetail(request, id):
  return render(request, 'index.html', {
    'page_name': 'Profile | ' + id
  })