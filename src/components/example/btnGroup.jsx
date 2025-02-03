import { useMemo, useState } from 'react';
import { XBtn, XIcon } from '../ui';
import { Form, useProps } from './utils';
export function BtnGroupExample() {
	const [val, setVal] = useState();
	const btnGroupExample = useProps(
		{
			grow: true,
			pills: false,
			vertical: false,
			multiple: false,
			selectable: false,
			switchable: false,
			separator: false,
			color: undefined,
			size: undefined,
			flat: false,
			dimmed: false,
			outline: false,
			tonal: false,
			plain: false,
			text: false,
			square: false,
			rounded: false,
			round: false,
			disabled: false,
		},
		'XBtn.Group',
		'\n \
		<XBtn value={1}>btn1</XBtn>\n \
		<XBtn value={2}>btn2</XBtn>\n \
		<XBtn value={3}>btn3</XBtn>\n',
	);
	const btnGroupProps = useMemo(() => btnGroupExample.props, [btnGroupExample.props]);
	const btnGroupCode = useMemo(() => btnGroupExample.code, [btnGroupExample.code]);

	return (
		<div className="max-w-4xl m-auto py-4">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XBtn.Group</h2>
			<div className="p-4">
				<XBtn.Group
					{...btnGroupProps}
					value={val}
					onChange={({ value }) => setVal(value)}
				>
					<XBtn value={1}>btn1</XBtn>
					<XBtn value={2}>btn2</XBtn>
					<XBtn value={3}>btn3</XBtn>
				</XBtn.Group>
				<br />
				<XBtn.Group
					{...btnGroupProps}
					value={val}
					onChange={({ value }) => setVal(value)}
				>
					<XBtn value={1}>
						<XIcon>mdi-close</XIcon>
					</XBtn>
					<XBtn value={2}>
						<XIcon>mdi-close</XIcon>
					</XBtn>
					<XBtn value={3}>
						<XIcon>mdi-close</XIcon>
					</XBtn>
				</XBtn.Group>
			</div>
			<hr className="my-2" />
			<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
				<div>
					<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
						{btnGroupCode}
					</pre>

					<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
						{JSON.stringify(val)}
					</pre>
				</div>
				<div>
					{Form(
						{
							'XBtn.Group options': { type: 'header' },
							switchable: { type: 'checkbox' },
							selectable: { type: 'checkbox' },
							multiple: { type: 'checkbox' },

							separator: { type: 'checkbox' },
							vertical: { type: 'checkbox' },
							grow: { type: 'checkbox' },
							pills: { type: 'checkbox' },

							align: {
								type: 'select',
								values: ['start', 'center', 'between', 'end'],
							},

							'XBtn options': { type: 'header' },
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
							size: {
								type: 'select',
								values: ['xs', 'sm', 'lg'],
							},
							flat: { type: 'checkbox' },
							dimmed: { type: 'checkbox' },
							outline: { type: 'checkbox' },
							tonal: { type: 'checkbox' },
							plain: { type: 'checkbox' },
							text: { type: 'checkbox' },
							block: { type: 'checkbox' },
							square: { type: 'checkbox' },
							rounded: { type: 'checkbox' },
							round: { type: 'checkbox' },
							disabled: { type: 'checkbox' },
							link: { type: 'checkbox' },
						},
						btnGroupExample,
					)}
				</div>
			</div>
		</div>
	);
}
