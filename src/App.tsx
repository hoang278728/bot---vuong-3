
import UserAgentBlocker from '@components/UserAgentBlocker';
import DynamicRouter from '@utils/Router';

const App = () => {
	return (
		<UserAgentBlocker>
			<DynamicRouter />
		</UserAgentBlocker>
	);
};

export default App;
