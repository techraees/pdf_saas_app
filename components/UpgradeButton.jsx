import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import axios from 'axios'; // Import axios for HTTP requests

const UpgradeButton = () => {
  const createStripeSession = async () => {
    try {
      // Replace with your actual API endpoint to create a Stripe session
      const response = await axios.post('/api/createStripeSession');
      const url = response.data.url ?? "/dashboard/billing";
      window.location.href = url;
    } catch (error) {
      console.error('Error creating Stripe session:', error.message);
      // Handle error and show toast or error message to user
    }
  };

  return (
    <Button onClick={() => createStripeSession()} className='w-full'>
      Upgrade now <ArrowRight className='h-5 w-5 ml-1.5' />
    </Button>
  );
};

export default UpgradeButton;
