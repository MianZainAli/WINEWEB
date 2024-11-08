from flask import render_template, Blueprint, request, jsonify, url_for, redirect


import requests
import stripe
from datetime import datetime

main = Blueprint('main', __name__)



# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
stripe.api_key = 'sk_test_51NvaioKUQgF63I9QfntSkIeQfiOtgTWSTSD1exnrL4gwUR8TxhuQvqGlTasMR4wULbnVibBCKGBLWxhQpdW9g9eu00HO0AP4ri'



@main.route("/index/<int:id>/<int:people>", methods=['POST', 'GET'])
def index(id, people):
    id_shop = id

    # Define the URL of the second app's endpoint
    lavineria_url = f'https://foodie-56c41215e495.herokuapp.com/lavineria/tables/{id}/{people}'

    # Make a GET request to the second app's route
    
    response = requests.get(lavineria_url)

    if response.status_code == 200:
        tables_data = response.json().get('data', {})
    else:
        tables_data = {}
    

    # Pass the tables data to the templates
    if id_shop == 1:
        return render_template('index.html', tables=tables_data, shop=id_shop)
    elif id_shop == 2:
        return render_template('index2.html', tables=tables_data, shop=id_shop)




@main.route("/")
@main.route("/shop-selection")
def shop_selection():
	title = "Scegli il negozio"
	return render_template('shop-select.html', title = title)




@main.route('/people/<int:id>', methods = ['POST', 'GET'])
def people_filter(id):
	id_shop = id
	if id_shop == 1:
		return render_template('people_filter.html', id = id_shop, title="Quante persone?")
	elif id_shop== 2:
		return render_template('people_filter.html', id = id_shop, title="Quante persone?")




@main.route('/order/success', methods=['GET'])
def order_success():
    payment_intent_id = request.args.get('payment_intent_id')
    
    if payment_intent_id:
        message = "Grazie per la tua prenotazione! Riceverai una mail di conferma con tutte le indicazioni ed il regolamento relativo all'eventuale disdetta del tavolo"
        lavineria_url = f'https://foodie-56c41215e495.herokuapp.com/lavineria/send-confirm-email/{payment_intent_id}'
        response = requests.get(lavineria_url)
        return render_template('success.html', message=message, title="Congratulazioni")


    return "Reservation not found", 404

