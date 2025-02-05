import { useState } from 'react';
import { XIcon, XInputSelect } from '../ui';
import { Form, useProps } from './utils';
export function SelectExample() {
	const [danses, setDanses] = useState({
		default: false,
		primary: false,
		secondary: false,
		accent: false,
		positive: false,
		negative: false,
		info: false,
		warning: false,
	});
	const [disables, setDisables] = useState({
		default: false,
		primary: false,
		secondary: false,
		accent: false,
		positive: false,
		negative: false,
		info: false,
		warning: false,
	});
	const selectExample = useProps(
		{
			label: 'Lable',
			labelColor: '',
			placeholder: 'Placeholder',
			hint: 'Hint',
			errorMessage: '',
			color: '',
			outline: false,
			filled: true,
			square: false,
			underlined: false,
			dense: false,
			stackLabel: false,
			disabled: false,
			lazyRules: true,
			hideHint: false,
			hideMessage: false,
			///???
			leftSection: '',
			rightSection: '',
			before: <XIcon className="text-warning text-4xl">mdi-home-account</XIcon>,
			after: <XIcon className="text-primary text-2xl">mdi-close</XIcon>,
			/*rules: [
				(v) => (v && v.length > 2) || 'min 3 characters',
				(v) => (v && v.length < 7) || 'max 6 characters',
			],*/
		},
		'XInputSelect',
	);
	return (
		<div className="max-w-4xl m-auto py-4">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XInput</h2>

			<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
				<div>
					<div>
						<XInputSelect {...selectExample.props}>
							<option value="1">item 1</option>
							<option value="2">item 2</option>
							<option value="3">item 3</option>
						</XInputSelect>
					</div>
					<div>
						<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
							{selectExample.code}
						</pre>
					</div>
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
							labelColor: {
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
							leftSection: { type: 'checkbox', val: 'mdi-account' },
							rightSection: { type: 'checkbox', val: 'mdi-close' },
							label: { type: 'text' },
							placeholder: { type: 'text' },
							hint: { type: 'text' },
							errorMessage: { type: 'text' },
							outline: { type: 'checkbox' },
							filled: { type: 'checkbox' },
							square: { type: 'checkbox' },
							underlined: { type: 'checkbox' },
							dense: { type: 'checkbox' },
							stackLabel: { type: 'checkbox' },
							disabled: { type: 'checkbox' },
							hideMessage: { type: 'checkbox' },
							lazyRules: { type: 'checkbox' },
							hideHint: { type: 'checkbox' },
						},
						selectExample,
					)}
				</div>
			</div>
		</div>
	);
}
