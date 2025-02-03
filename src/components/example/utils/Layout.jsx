import { Link, Route, Routes } from 'react-router-dom';
import { AppProvider } from './components/app';
import {
	BtnExample,
	BtnGroupExample,
	CardsExample,
	InputExample,
	ListExample,
	MessageExample,
	ProgressExample,
	SpinnerExample,
} from './components/example';
import { XIcon, XItem, XItemLabel, XItemSection, XList } from './components/ui';
import { XLayout } from './components/ui/layout';
import { ThemeProvider } from './hooks/useTheme';
function App() {
	return (
		<AppProvider config={{ smKey: 'app-1' }}>
			<XLayout container={true} overlay={true} toggle={true} view="lhr lpr lff">
				{{
					left: (props) => (
						<XList separator={true}>
							<XItem to="/btn" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-button-pointer</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XBtn</XItemLabel>
								</XItemSection>
							</XItem>
							<XItem to="/btn-group" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-card-outline</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XBtnGroup</XItemLabel>
								</XItemSection>
							</XItem>
							<XItem to="/input" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-form-textbox</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XInput</XItemLabel>
								</XItemSection>
							</XItem>
							<XItem to="/list" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-view-list</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XList</XItemLabel>
								</XItemSection>
							</XItem>
							<XItem to="/message" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-message-alert-outline</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XMessage</XItemLabel>
								</XItemSection>
							</XItem>
							<XItem to="/spinner" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-reload</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XSpinner</XItemLabel>
								</XItemSection>
							</XItem>
							<XItem to="/progress" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-progress-helper</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XProgress</XItemLabel>
								</XItemSection>
							</XItem>
							<XItem to="/cards" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-cards</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XCards</XItemLabel>
								</XItemSection>
							</XItem>
						</XList>
					),
					header: <ThemeProvider.Toggler></ThemeProvider.Toggler>,
					footer: 'footer',
					//right: 'right',
					default: (props) => (
						<Routes>
							<Route path="/" element={<div>Home</div>} />
							<Route path="/btn" element={<BtnExample />} />
							<Route path="/btn-group" element={<BtnGroupExample />} />
							<Route path="/input" element={<InputExample />} />
							<Route path="/list" element={<ListExample />} />
							<Route path="/message" element={<MessageExample />} />
							<Route path="/spinner" element={<SpinnerExample />} />
							<Route path="/progress" element={<ProgressExample />} />
							<Route path="/cards" element={<CardsExample />} />
						</Routes>
					),
				}}
			</XLayout>
		</AppProvider>
	);
}

export default App;
