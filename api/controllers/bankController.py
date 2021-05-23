from django.shortcuts import get_object_or_404
from api.utils import getBankJsonFromObject, getBanksJsonFromObject, getBankGroupJsonFromObject
from rest_framework.response import Response
from api.models import BankGroup, Bank


def getBanks(reqData):
  user_id = reqData.get('user_id')

  results = []
  bankGroups = BankGroup.objects.filter(user=user_id)
  for bankGroup in bankGroups:
    banks = Bank.objects.filter(user=user_id, group=bankGroup.id)
    results.append(
      getBankGroupJsonFromObject(bankGroup, banks)
    )
  banksHasNotGroups = Bank.objects.filter(user=user_id, group=None)
  results.append({
    'banks': getBanksJsonFromObject(banksHasNotGroups)
  })
  return Response(results)


def postBank(reqData):
  user_id = reqData.get('user_id')
  bank_group_id = reqData.get('bank_group_id')
  title = reqData.get('title')
  balance = reqData.get('balance')

  newBank = Bank(
    user_id = user_id,
    group_id = bank_group_id if bank_group_id else None,
    title = title,
    balance = balance,
  )
  newBank.save()
  return Response(getBankJsonFromObject(newBank))


def putBank(reqData):
  bank_id = reqData.get('bank_id')

  bank = get_object_or_404(Bank, pk=bank_id)
  for k in reqData:
    setattr(bank, k, reqData[k])
  bank.save()
  return Response(getBankJsonFromObject(bank))


def deleteBank(reqData):
  # category_id = reqData.get('category_id')

  # category = get_object_or_404(Category, pk=category_id)
  # category.delete()
  return Response(True)


def postBankGroup(reqData):
  user_id = reqData.get('user_id')
  title = reqData.get('title')

  newBankGroup = BankGroup(
    user_id = user_id,
    title = title,
  )
  newBankGroup.save()
  return Response(getBankGroupJsonFromObject(newBankGroup))


def putBankGroup(reqData):
  bank_group_id = reqData.get('bank_group_id')

  bankGroup = get_object_or_404(BankGroup, pk=bank_group_id)
  for k in reqData:
    setattr(bankGroup, k, reqData[k])
  bankGroup.save()
  return Response(getBankGroupJsonFromObject(bankGroup))


def deleteBankGroup(reqData):
  # category_group_id = reqData.get('category_group_id')

  # categoryGroup = get_object_or_404(CategoryGroup, pk=category_group_id)
  # categoryGroup.delete()
  return Response(True)
