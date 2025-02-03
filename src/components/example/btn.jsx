import { useState } from 'react';
import { XBtn } from '../ui';
import { Form, useProps } from './utils';

export function BtnExample() {
	const [label, setLabel] = useState('Example');
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

	const btnExample = useProps(
		{
			color: '',
			size: '',
			dimmed: false,
			flat: false,
			outline: false,
			tonal: false,
			text: false,
			plain: false,
			block: false,
			square: false,
			round: false,
			rounded: false,
			disabled: false,
			link: false,
			active: false,
			loading: false,
			leftSection: '',
			rightSection: '',
		},
		'XBtn',
		label,
	);

	return (
		<div className="max-w-4xl m-auto py-4">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XBtn</h2>
			{true && (
				<table className="table-auto w-full border-collapse border-spacing-0 border border-separator">
					<thead>
						<tr className="*:text-center">
							<td>color</td>
							<td>standart</td>
							<td>flat</td>
							<td>outline</td>
							<td>tonal</td>
							<td>plain</td>
							<td>text</td>
							<td>active</td>
						</tr>
					</thead>
					<tbody>
						{'default primary secondary accent positive negative info warning dimmed'
							.split(/\s+/)
							.map((color) => (
								<tr
									key={color}
									className="*:border *:border-separator *:p-2 *:text-center"
								>
									<td>
										{color}
										<label className="block">
											<input
												type="checkbox"
												name={color}
												checked={disables[color]}
												onChange={({ target }) =>
													setDisables((v) => ({
														...v,
														[target.name]: !v[target.name],
													}))
												}
											/>
											<span className="ml-3 font-medium text-slate-500">
												Disabled
											</span>
										</label>
									</td>
									<td>
										<XBtn disabled={disables[color]} color={color}>
											Default
										</XBtn>
									</td>
									<td>
										<XBtn
											disabled={disables[color]}
											color={color}
											flat={true}
										>
											Flat
										</XBtn>
									</td>
									<td>
										<XBtn
											disabled={disables[color]}
											color={color}
											outline={true}
										>
											Outline
										</XBtn>
									</td>
									<td>
										<XBtn
											disabled={disables[color]}
											color={color}
											tonal={true}
										>
											Tonal
										</XBtn>
									</td>
									<td>
										<XBtn
											disabled={disables[color]}
											color={color}
											plain={true}
										>
											Plain
										</XBtn>
									</td>
									<td>
										<XBtn
											disabled={disables[color]}
											color={color}
											text={true}
										>
											Text
										</XBtn>
									</td>
									<td>
										<XBtn
											disabled={disables[color]}
											color={color}
											active={true}
										>
											Active
										</XBtn>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			)}

			<hr className="my-2" />
			<div className="grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
				<div>
					<XBtn {...btnExample.props}>{label}</XBtn>
					<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
						{btnExample.code}
					</pre>
				</div>
				<div>
					<label className="block">
						<span className="block font-medium text-slate-500">label</span>
						<input
							className="bg-slate-700 border border-blue-900 p-2"
							type="text"
							value={label}
							onChange={({ target }) => setLabel(target.value)}
						/>
					</label>
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
							size: {
								type: 'select',
								values: ['xs', 'sm', 'lg'],
							},
							leftSection: { type: 'checkbox', val: 'mdi-map-marker' },
							rightSection: { type: 'checkbox', val: 'mdi-close' },
							flat: { type: 'checkbox' },
							dimmed: { type: 'checkbox' },
							outline: { type: 'checkbox' },
							tonal: { type: 'checkbox' },
							plain: { type: 'checkbox' },
							loading: { type: 'checkbox' },
							text: { type: 'checkbox' },
							block: { type: 'checkbox' },
							square: { type: 'checkbox' },
							rounded: { type: 'checkbox' },
							round: { type: 'checkbox' },
							disabled: { type: 'checkbox' },
							link: { type: 'checkbox' },
							active: { type: 'checkbox' },
						},
						btnExample,
					)}
				</div>
			</div>
		</div>
	);
}
