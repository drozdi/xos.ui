import { useState } from 'react';
import { XAccordion, XAccordionHeader, XAccordionPanel, XAccordionTab } from '../ui';
import { Form, useProps } from './utils';
export function AccordionExample() {
	const [val, setVal] = useState();
	//useEffect(() => console.log(val), [val]);
	const accordionExample = useProps(
		{
			border: false,
			field: false,
			square: false,
			separated: false,
			multiple: false,
		},
		'XAccordion',
		`
	<XAccordionTab value="acc-1">
		<XAccordionHeader>Header I</XAccordionHeader>
		<XAccordionPanel>
			sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty uitur 54e t5 7y
		</XAccordionPanel>
	</XAccordionTab>
	<XAccordionTab value="acc-2" disabled>
		<XAccordionHeader>Header II</XAccordionHeader>
		<XAccordionPanel>
			sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty uitur 54e t5 7y
		</XAccordionPanel>
	</XAccordionTab>
	<XAccordionTab value="acc-3">
		<XAccordionHeader>Header III</XAccordionHeader>
		<XAccordionPanel>
			sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty uitur 54e t5 7y
		</XAccordionPanel>
	</XAccordionTab>
`,
	);
	return (
		<div className="max-w-4xl m-auto py-4 relative">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XAccordion</h2>
			<div className="p-4">
				<XAccordion
					{...accordionExample.props}
					onChange={({ value }) => setVal(value)}
				>
					<XAccordionTab value="acc-1">
						<XAccordionHeader>Header I</XAccordionHeader>
						<XAccordionPanel>
							sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty
							uitur 54e t5 7y
						</XAccordionPanel>
					</XAccordionTab>
					<XAccordionTab value="acc-2" disabled>
						<XAccordionHeader>Header II</XAccordionHeader>
						<XAccordionPanel>
							sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty
							uitur 54e t5 7y
						</XAccordionPanel>
					</XAccordionTab>
					<XAccordionTab value="acc-3">
						<XAccordionHeader>Header III</XAccordionHeader>
						<XAccordionPanel>
							sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty
							uitur 54e t5 7y
						</XAccordionPanel>
					</XAccordionTab>
				</XAccordion>
				<div className="mt-8 grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
					<div>
						<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text overflow-scroll">
							{accordionExample.code}
						</pre>
						<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text">
							{JSON.stringify(val)}
						</pre>
					</div>
					<div>
						{Form(
							{
								border: { type: 'checkbox' },
								field: { type: 'checkbox' },
								square: { type: 'checkbox' },
								separated: { type: 'checkbox' },
								multiple: { type: 'checkbox' },
							},
							accordionExample,
						)}
					</div>
				</div>
				<hr className="my-4" />
				<XAccordionTab value="acc-1">
					<XAccordionHeader>Header I</XAccordionHeader>
					<XAccordionPanel>
						sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty uitur
						54e t5 7y
					</XAccordionPanel>
				</XAccordionTab>
			</div>
		</div>
	);
}
