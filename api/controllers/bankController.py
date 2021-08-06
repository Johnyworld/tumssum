from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from api.utils.serializers import BankGroupSerializer, BankSerializer
from rest_framework.response import Response
from api.models import BankGroup, Bank


def getBanks(request):
  user_id = request.GET.get('user_id')

  groups = BankGroup.objects.filter(user=user_id)
  banks = Bank.objects.filter(user=user_id)

  groupsData = BankGroupSerializer(groups, many=True).data
  banksData = BankSerializer(banks, many=True).data

  data = {
    'groups': groupsData,
    'banks': banksData
  }

  res = { 'ok': True, 'data': data }
  return JsonResponse(res)


def postBank(reqData):
  user_id = reqData.get('user_id')
  bank_group_id = reqData.get('bank_group_id')
  title = reqData.get('title')
  balance = reqData.get('balance')

  newBank = Bank.objects.create(
    user_id = user_id,
    group_id = bank_group_id if bank_group_id else None,
    title = title,
    balance = balance,
  )

  res = { 'ok': True, 'data': BankSerializer(newBank, many=False).data }
  return JsonResponse(res)


def putBank(reqData):
  bank_id = reqData.get('bank_id')

  bank = get_object_or_404(Bank, pk=bank_id)
  for k in reqData:
    setattr(bank, k, reqData[k])
  bank.save()

  res = { 'ok': True, 'data': BankSerializer(bank, many=False).data }
  return JsonResponse(res)


def deleteBank(reqData):
  bank_id = reqData.get('bank_id')

  bank = get_object_or_404(Bank, pk=bank_id)
  bank.delete()

  res = { 'ok': True, 'data': bank_id }
  return JsonResponse(res)


def postBankGroup(reqData):
  user_id = reqData.get('user_id')
  title = reqData.get('title')

  newBankGroup = BankGroup.objects.create(
    user_id = user_id,
    title = title,
  )

  res = { 'ok': True, 'data': BankGroupSerializer(newBankGroup, many=False).data }
  return JsonResponse(res)


def putBankGroup(reqData):
  bank_group_id = reqData.get('bank_group_id')

  bankGroup = get_object_or_404(BankGroup, pk=bank_group_id)
  for k in reqData:
    setattr(bankGroup, k, reqData[k])
  bankGroup.save()

  res = { 'ok': True, 'data': BankGroupSerializer(bankGroup, many=False).data }
  return JsonResponse(res)


def deleteBankGroup(reqData):
  user_id = reqData.get('user_id')
  bank_group_id = reqData.get('bank_group_id')

  banks = Bank.objects.filter(user=user_id, group=bank_group_id)
  for k in banks:
    setattr(k, 'group_id', None)
  categoriesSerialized = BankSerializer(banks, many=True).data

  bankGroup = get_object_or_404(BankGroup, pk=bank_group_id)
  bankGroup.delete()

  res = { 'ok': True, 'data': { 'id': bank_group_id, 'items': categoriesSerialized } }
  return JsonResponse(res)
