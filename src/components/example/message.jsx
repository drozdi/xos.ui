import { useRef } from 'react';
import { XBtn } from '../ui/btn';
import { XMessage } from '../ui/message';
import { XMessages } from '../ui/messages';
import { XToast } from '../ui/toast';
import { Form, useProps } from './utils';
export function MessageExample() {
	const mesgs = useRef(null);
	const mess = [
		{
			children: 'Test 1',
			life: 3000,
			outline: false,
			icon: 'mdi-home',
			sticky: true,
			closable: true,
		},
		{
			children: 'Test 2',
			life: 6000,
			closable: true,
			color: 'warning',
			icon: 'mdi-home',
		},
		{
			children: 'Test 3',
			color: 'negative',
			underlined: 'top',
			outline: false,
			icon: 'mdi-home',
		},
	];
	const onShowMessages = () => {
		mesgs.current.show([...mess]);
	};
	const onReplaceMessages = () => {
		mesgs.current.replace([...mess]);
	};
	const onClearMessages = () => {
		mesgs.current.clear();
	};
	const toast = useRef(null);
	const onShowToast = () => {
		toast.current.show([...mess]);
	};
	const onReplaceToast = () => {
		toast.current.replace([...mess]);
	};
	const onClearToast = () => {
		toast.current.clear();
	};

	const messageExample = useProps(
		{
			underlined: '',
			closable: false,
			color: '',
			outline: false,
			square: false,
			loading: false,
			filled: false,
			flat: false,
		},
		'XMessage',
		'Test 1',
	);

	const messagesExample = useProps(
		{
			underlined: '',
			closable: false,
			color: '',
			outline: false,
			square: false,
			life: 9000,
			row: false,
			sticky: false,
			filled: false,
			flat: false,
		},
		'XMessages',
	);

	const toastExample = useProps(
		{
			closable: false,
			color: '',
			underlined: '',
			outline: false,
			square: false,
			life: 9000,
			row: false,
			sticky: false,
		},
		'XToast',
	);

	return (
		<div className="max-w-4xl m-auto p-4 relative">
			<h3>XMessage</h3>
			<div className="flex flex-col gap-4">
				<XMessage {...messageExample.props} label="We notify you that">
					You are now obligated to give a star to Mantine project on GitHub
					<br />
					You are now obligated to give a star to Mantine project on GitHub
				</XMessage>
				<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
					<div>
						<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
							{messageExample.code}
						</pre>
					</div>
					<div>
						{Form(
							{
								color: {
									type: 'select',
									values: [
										'primary',
										'secondary',
										'accent',
										'positive',
										'negative',
										'info',
										'warning',
									],
								},
								underlined: {
									type: 'select',
									values: ['top', 'bottom', 'left', 'right'],
								},
								loading: { type: 'checkbox' },
								icon: { type: 'checkbox', val: 'mdi-map-marker' },
								flat: { type: 'checkbox' },
								filled: { type: 'checkbox' },
								outline: { type: 'checkbox' },
								square: { type: 'checkbox' },
							},
							messageExample,
						)}
					</div>
				</div>
			</div>
			<hr className="my-4" />
			<h3>XMessages</h3>
			<XMessages {...messagesExample.props} ref={mesgs} />
			<br />
			<XBtn.Group>
				<XBtn onClick={onShowMessages}>Show</XBtn>
				<XBtn onClick={onReplaceMessages}>Replace</XBtn>
				<XBtn onClick={onClearMessages}>Clear</XBtn>
			</XBtn.Group>
			<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
				<div>
					<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
						{messagesExample.code}
					</pre>
				</div>
				<div>
					{Form(
						{
							color: {
								type: 'select',
								values: [
									'primary',
									'secondary',
									'accent',
									'positive',
									'negative',
									'info',
									'warning',
								],
							},
							underlined: {
								type: 'select',
								values: ['top', 'bottom', 'left', 'right'],
							},
							outline: { type: 'checkbox' },
							square: { type: 'checkbox' },
							filled: { type: 'checkbox' },
							flat: { type: 'checkbox' },
							row: { type: 'checkbox' },
							sticky: { type: 'checkbox' },
							closable: { type: 'checkbox' },
							life: { type: 'number' },
						},
						messagesExample,
					)}
				</div>
			</div>
			<hr className="my-4" />
			<h3>XToast</h3>
			<XBtn.Group>
				<XBtn onClick={onShowToast}>Show</XBtn>
				<XBtn onClick={onReplaceToast}>Replace</XBtn>
				<XBtn onClick={onClearToast}>Clear</XBtn>
			</XBtn.Group>
			<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
				<div>
					<XToast {...toastExample.props} ref={toast} />
					<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
						{toastExample.code}
					</pre>
				</div>
				<div>
					{Form(
						{
							color: {
								type: 'select',
								values: [
									'primary',
									'secondary',
									'accent',
									'positive',
									'negative',
									'info',
									'warning',
								],
							},
							position: {
								type: 'select',
								values: [
									'left-top',
									'left-center',
									'left-bottom',
									'center-top',
									'center-center',
									'center-bottom',
									'right-top',
									'right-center',
									'right-bottom',
								],
							},
							life: { type: 'number' },
							underlined: { type: 'checkbox' },
							closable: { type: 'checkbox' },
							outline: { type: 'checkbox' },
							square: { type: 'checkbox' },
						},
						toastExample,
					)}
				</div>
			</div>
		</div>
	);
}
