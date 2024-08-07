
import { useStripe , CardField, StripeProvider    } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import {  Alert , View , Text , BackHandler} from 'react-native';
import LoadingButton from '../Components/LoadingButton';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';

import auth from '@react-native-firebase/auth';
import { fontSize } from '../Constants/theme';

 
function  PaymentScreen  ({navigation}) {

  const user = auth().currentUser;

   
    const { confirmPayment  } = useStripe();

    const [loading , setLoading] = useState(false);
    const [showBtn , setShowBtn] = useState(false);

    const [error, setError] = useState(null);


  const placeOrder = (paymentIntent : any) => {

    const orderDetails = {
      id:paymentIntent.id , 
      amount: paymentIntent.amount,
      currency : paymentIntent.currency,
      billingDetails: paymentIntent.paymentMethod.billingDetails,
      paymentMethodType: paymentIntent.paymentMethod.paymentMethodType,
      paymentStatus: paymentIntent.status,
      createdAt:paymentIntent.created ,
    };

    // console.log(data)

    
    navigation.navigate('OrderSuccess' , {orderDetails});
  };



  



    const fetchPaymentIntentClientSecret = async  ( ) => {
    
        try{

      // const res = await  fetch('https://8d6f-49-36-25-244.ngrok-free.app/create-payment-intent', {

      const res = await  fetch('https://skillsquad-tasks.vercel.app/create-payment-intent', {
        method : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            amount: 1000 ,
            currency: 'inr',
            gateway: 'card',
          }),} )


      const result = await res.json();


      if(!result){
        throw Error('Error')
      }

     const { clientSecret  , error} = result
      return { clientSecret  , error} ;
        }

      catch(e){
          console.log( 'fetchPaymentIntentClientSecret Error : ' ,  e ) 
          // Alert.alert('Server Error ' )
          setError(`Server Error: ${e.message}`);
          setLoading(false);
          setShowBtn(true)
      }
    }


















    const handlePayment = async ()=>{
      
            setLoading(true)
            setShowBtn(false)

            const billingDetails = {
                name : "vikash verma" ,
                email :"vikashvermacom92@gmail.com",
                phone: '+918817956935',
                address: {
                  line1: 'room no 101',
                  line2: 'patel nagar',
                  postalCode: '462022',
                  country: 'IN',
                },
            }

            const {clientSecret , error} = await  fetchPaymentIntentClientSecret();

            if(error || !clientSecret){
                // Alert.alert('Unable to process payment ! Try Again')
          setError(`Server Error: ${error.message}`);

                setLoading(false)
                setShowBtn(true)
                return 
            }

      

            try{

            const {error , paymentIntent} = await confirmPayment(clientSecret , 
              {
                paymentMethodType: 'Card' ,
                paymentMethodData: { 
                  billingDetails: billingDetails ,
                 
                },
              });

                if (error) {
                  console.log('PAYMENT ERROR : ' , error.message)
                  // Alert.alert(error?.localizedMessage);
          setError(`Server Error: ${error.message}`);

                } 
                else if (paymentIntent) {
                   console.log(paymentIntent)
                   Alert.alert(`Payment of INR ${1000}   is successful! `)
                   placeOrder(paymentIntent)
                }
            }
            catch(e){
                console.log(e.message)
                // Alert.alert('SERVER ERROR : ' +e.message)
                setError(`Server Error: ${e.message}`);
                
            }
            setLoading(false)
            setShowBtn(true) 
    }

    return (


      <View style = {styles.container}> 

      <Text style={styles.title}> Enter Card Details</Text>


      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.noteBox}>
        <Text style={styles.noteText}>Please use any Indian credit card number. Example: 4000 0035 6000 0008</Text>
      </View>

        <StripeProvider
        publishableKey="pk_test_51J5EHJSEzMLO0wLKuoQkQvHZDW5XE5xwQiSXP61XSBMfzmHNvLDnf9iU0Ba68wuh6nAldPxtld3ORd1P07BDzDsq00ndvDCXLX"
      >
      <CardField
      postalCodeEnabled={false}
        
        style={styles.cardContainer}

        cardStyle={{
          textColor : 'white',
          fontSize:15,
          borderColor:'blue',
          borderWidth:1,
          backgroundColor :'black',
          
        }}
        
        onCardChange={(card) => {
          if(card.complete) setShowBtn(true)
          else setShowBtn(false)
        }}
      /> 

          </StripeProvider>

<LoadingButton 
            title={'Pay Now'}
           onClick={() => handlePayment() }
            bg = 'green'
           color = 'white'
           loading={ loading}
           showBtn={ showBtn}
           marginTop={verticalScale(30)}
/>
          </View>
    );
  }

  export default PaymentScreen
  

const styles = ScaledSheet.create({
  container:{
// flex : 1,
// alignItems : 'center',
padding:'10@ms',
paddingTop:20 ,
height : '300@vs' 
  },
  title:{
fontSize:fontSize.large,
fontWeight:'600', 
color:'#000'
  },

      cardContainer :{
        width: '100%',
        height: '60@vs',
        borderWidth:1,
        marginTop : '10@vs',
        borderRadius:'10@ms',
       

      },
      noteBox: {
        backgroundColor: '#e0f7fa',
        padding: '10@ms',
        borderRadius: '5@ms',
        marginVertical: '10@vs'
      },
      noteText: {
        color: '#00796b',
        fontSize: fontSize.regular,
      },
      errorBox: {
        backgroundColor: '#ffebee',
        padding: '10@ms',
        borderRadius: '5@ms',
        marginVertical: '10@vs'
      },
      errorText: {
        color: '#d32f2f',
        fontSize: fontSize.regular,
      },
  
})

