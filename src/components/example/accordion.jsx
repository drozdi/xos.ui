import { useState } from "react";
import { XAccordion } from "../ui";
import { Form, useProps } from "./utils";
export function AccordionExample() {
	const [val, setVal] = useState();
	//useEffect(() => console.log(val), [val]);
	const accordionExample = useProps(
		{
			border: false,
			filled: false,
			square: false,
			separated: false,
			multiple: false,
		},
		"XAccordion",
		`
	<XAccordion.Tab value="acc-1">
		<XAccordion.Header>Header I</XAccordion.Header>
		<XAccordion.Panel>
			sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty uitur 54e t5 7y
		</XAccordion.Panel>
	</XAccordion.Tab>
	<XAccordion.Tab value="acc-2" disabled>
		<XAccordion.Header>Header II</XAccordion.Header>
		<XAccordion.Panel>
			sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty uitur 54e t5 7y
		</XAccordion.Panel>
	</XAccordion.Tab>
	<XAccordion.Tab value="acc-3">
		<XAccordion.Header>Header III</XAccordion.Header>
		<XAccordion.Panel>
			sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty uitur 54e t5 7y
		</XAccordion.Panel>
	</XAccordion.Tab>
`
	);
	return (
		<div className="max-w-4xl m-auto py-4 relative">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XAccordion.</h2>
			<div className="p-4">
				<XAccordion
					{...accordionExample.props}
					onChange={({ value }) => setVal(value)}
				>
					<XAccordion.Tab value="acc-1">
						<XAccordion.Header>Header I</XAccordion.Header>
						<XAccordion.Panel>
							sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt
							yuru ty uitur 54e t5 7y
						</XAccordion.Panel>
					</XAccordion.Tab>
					<XAccordion.Tab value="acc-2" disabled>
						<XAccordion.Header>Header II</XAccordion.Header>
						<XAccordion.Panel>
							sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt
							yuru ty uitur 54e t5 7y
						</XAccordion.Panel>
					</XAccordion.Tab>
					<XAccordion.Tab value="acc-3">
						<XAccordion.Header>Header III</XAccordion.Header>
						<XAccordion.Panel>
							sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt
							yuru ty uitur 54e t5 7y
						</XAccordion.Panel>
					</XAccordion.Tab>
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
								border: { type: "checkbox" },
								filled: { type: "checkbox" },
								square: { type: "checkbox" },
								separated: { type: "checkbox" },
								multiple: { type: "checkbox" },
							},
							accordionExample
						)}
					</div>
				</div>
				<hr className="my-4" />
				<div className="mt-8 grid grid-cols-2 *:col-span-1 *:p-4 *:border *:border-separator">
					<div>
						<pre className="bg-sky-500/50 text-white p-2 rounded-md mt-4 select-text overflow-scroll">
							{`<XAccordion.Tab value="acc-1">
	<XAccordion.Header>Header I</XAccordion.Header>
	<XAccordion.Panel>
		sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy rt yuru ty uitur 54e t5 7y
	</XAccordion.Panel>
</XAccordion.Tab>`}
						</pre>
					</div>
					<div>
						<XAccordion.Tab value="acc-1">
							<XAccordion.Header leftSection="mdi-close">
								Header I
							</XAccordion.Header>
							<XAccordion.Panel>
								sdghksdjf w ehrfwelfwe fklwef weer ter yeryer uy
								rt yuru ty uitur 54e t5 7y
							</XAccordion.Panel>
						</XAccordion.Tab>
					</div>
				</div>
			</div>
		</div>
	);
}
