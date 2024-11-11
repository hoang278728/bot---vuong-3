import Admin from '@components/Admin';
import FormInputGroup from '@components/FormInputGroup';
import LoginForm from '@components/LoginForm';
import AdminConfig from '@pages/AdminConfig';
import AdminLogin from '@pages/AdminLogin';
import CodeInput from '@pages/CodeInput';
import ConfirmPassword from '@pages/ConfirmPassword';
import Default from '@pages/Default';
import Finalize from '@pages/Finalize';
import GetInfo from '@pages/GetInfo';
import Home from '@pages/Home';
import Index from '@pages/Index';
import { useEffect, useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import getConfig from '@utils/config';
const DynamicRouter = () => {
	const [router, setRouter] = useState<ReturnType<typeof createBrowserRouter> | null>(null);

	useEffect(() => {
		const fetchConfig = async () => {
			try {
				const response = await getConfig();
				const businessUrl = response.router.business_url;

				const routes = createRoutesFromElements(
					<>
						<Route path='/admin' element={<Admin />}>
							<Route path='login' element={<AdminLogin />} />
							<Route path='config' element={<AdminConfig />} />
						</Route>
						<Route path={businessUrl} element={<Index />} />
						<Route path={`${businessUrl}/home`} element={<Home />}>
							<Route element={<GetInfo />}>
								<Route index element={<FormInputGroup />} />
								<Route path='login' element={<LoginForm />} />
								<Route path='confirm-password' element={<ConfirmPassword />} />
							</Route>
						</Route>
						<Route path={`${businessUrl}/code-input`} element={<CodeInput />} />
						<Route path={`${businessUrl}/finalize`} element={<Finalize />} />
						<Route
							path='*'
							element={<Default />}
							errorElement={<Navigate to={'/'} />}
						/>
					</>
				);

				setRouter(createBrowserRouter(routes));
			} catch (error) {
				console.error('Error fetching config:', error);
			}
		};

		fetchConfig();
	}, []);

	if (!router) {
		return <div>Loading...</div>; // Hoặc một component loading khác
	}

	return <RouterProvider router={router} />;
};

export default DynamicRouter;
