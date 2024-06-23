'use client';

import { useState } from 'react';
import axios from 'axios';
import { useToast } from './ui/use-toast';
import MaxWidthWrapper from './MaxWidthWrapper';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/Card';
import { Button } from './ui/Button';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

const BillingForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState({
    name: 'Basic Plan',
    isSubscribed: true,
    isCanceled: false,
    stripeCurrentPeriodEnd: new Date(),
  });

  const createStripeSession = async () => {
    try {
      setIsLoading(true);
      // Simulate API call to create a Stripe session
      const response = await axios.post('/api/create-stripe-session');
      const { url } = response.data;
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Stripe session URL not received');
      }
    } catch (error) {
      console.error('Error creating Stripe session:', error);
      toast({
        title: 'There was a problem...',
        description: 'Please try again in a moment',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MaxWidthWrapper className='max-w-5xl'>
      <form
        className='mt-12'
        onSubmit={(e) => {
          e.preventDefault();
          createStripeSession();
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>
              You are currently on the{' '}
              <strong>{subscriptionPlan.name}</strong> plan.
            </CardDescription>
          </CardHeader>

          <CardFooter className='flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0'>
            <Button type='submit'>
              {isLoading ? (
                <Loader2 className='mr-4 h-4 w-4 animate-spin' />
              ) : null}
              {subscriptionPlan.isSubscribed
                ? 'Manage Subscription'
                : 'Upgrade to PRO'}
            </Button>

            {subscriptionPlan.isSubscribed ? (
              <p className='rounded-full text-xs font-medium'>
                {subscriptionPlan.isCanceled
                  ? 'Your plan will be canceled on '
                  : 'Your plan renews on'}
                {format(
                  subscriptionPlan.stripeCurrentPeriodEnd,
                  'dd.MM.yyyy'
                )}
                .
              </p>
            ) : null}
          </CardFooter>
        </Card>
      </form>
    </MaxWidthWrapper>
  );
};

export default BillingForm;
