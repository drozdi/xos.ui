import { XChevron, XIcon, XLink } from '../ui';

export function LinkExample() {
	return (
		<div className="max-w-4xl m-auto py-4 relative">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XLink</h2>
			<div className="grid grid-cols-2">
				<div>
					<XLink
						to="#required-for-focus"
						label="With icon"
						leftSection="mdi-home"
					/>
					<XLink
						href="#required-for-focus"
						label="With right section"
						leftSection={<XIcon>mdi-gauge</XIcon>}
						rightSection={<XChevron />}
					/>
					<XLink
						href="#required-for-focus"
						label="Disabled"
						leftSection="mdi-circle-off-outline"
						disabled
					/>
					<XLink
						href="#required-for-focus"
						label="With description"
						description="Additional information"
					/>
					<XLink
						href="#required-for-focus"
						label="Active subtle"
						description="Additional information"
						leftSection="mdi-sine-wave"
						rightSection={<XChevron />}
					/>
					<XLink
						href="#required-for-focus"
						label="Active light"
						leftSection="mdi-sine-wave"
						rightSection={<XChevron />}
						active
					/>
					<XLink
						href="#required-for-focus"
						label="Active light"
						description="Additional information"
						leftSection="mdi-sine-wave"
						rightSection={<XChevron />}
						active
					/>
				</div>
				<pre className="ps-4">
					<code className="language-jsx">
						{`<XLink
	href="#required-for-focus"
	label="With icon"
	leftSection="mdi-home" />
<XLink
	href="#required-for-focus"
	label="With right section"
	leftSection={<XIcon>mdi-gauge</XIcon>}
	rightSection={<XChevron />}	/>
<XLink
	href="#required-for-focus"
 	label="Disabled"
	leftSection="mdi-circle-off-outline"
	disabled />
<XLink
	href="#required-for-focus"
	label="With description"
	description="Additional information" />
<XLink
	href="#required-for-focus"
	label="Active subtle"
	description="Additional information"
	leftSection="mdi-sine-wave"
	rightSection={<XChevron />}	/>
<XLink
	href="#required-for-focus"
	label="Active light"
	leftSection="mdi-sine-wave"
	rightSection={<XChevron />}
	active />
<XLink
	href="#required-for-focus"
	label="Active light"
	description="Additional information"
	leftSection="mdi-sine-wave"
	rightSection={<XChevron />}
	active />`}
					</code>
				</pre>
			</div>
			<h3 className="py-4 text-xl/none text-center border-t border-color">
				Nested XLink
			</h3>
			<div className="p-4">
				<div className="grid grid-cols-2">
					<div>
						<XLink label="label" href="#1" leftSection="mdi-close">
							<XLink label="label" href="#1" leftSection="mdi-home">
								<XLink
									label="label"
									leftSection="mdi-home"
									description="description"
									href="#1"
								/>
								<XLink
									label="label"
									description="description"
									href="#1"
								/>
							</XLink>
							<XLink
								label="label"
								description="description"
								href="#1"
								active
							/>
							<XLink
								label="label"
								leftSection="mdi-home"
								description="description"
								href="#1"
								disabled
							/>
							<XLink
								label="label"
								description="description"
								href="#1"
								leftSection={<XIcon>mdi-close</XIcon>}
								disabled
							>
								<XLink
									label="label"
									description="description"
									href="#1"
								/>
								<XLink
									label="label"
									description="description"
									href="#1"
								/>
								<XLink
									label="label"
									description="description"
									href="#1"
								/>
								<XLink
									label="label"
									description="description"
									href="#1"
								/>
							</XLink>
						</XLink>
						<XLink label="label" href="#1" leftSection="mdi-close">
							<XLink label="label" href="#1" leftSection="mdi-home">
								<XLink
									label="label"
									leftSection="mdi-home"
									description="description"
									href="#1"
								/>
								<XLink
									label="label"
									description="description"
									href="#1"
								/>
							</XLink>
							<XLink
								label="label"
								description="description"
								href="#1"
								active
							/>
							<XLink
								label="label"
								leftSection="mdi-home"
								description="description"
								href="#1"
								disabled
							/>
							<XLink
								label="label"
								description="description"
								href="#1"
								leftSection={<XIcon>mdi-close</XIcon>}
							>
								<XLink
									label="label"
									description="description"
									href="#1"
								/>
								<XLink
									label="label"
									description="description"
									href="#1"
								/>
								<XLink
									label="label"
									description="description"
									href="#1"
								/>
								<XLink
									label="label"
									description="description"
									href="#1"
								/>
							</XLink>
						</XLink>
					</div>
					<pre className="ps-4">
						<code className="language-jsx">
							{`<XLink 
	label="label"
	href="#1"
	leftSection="mdi-close">
	<XLink 
		label="label" 
		href="#1" 
		leftSection="mdi-home">
		<XLink
			label="label"
			leftSection="mdi-home"
			description="description"
			href="#1" />
		<XLink
			label="label"
			description="description"
			href="#1" />
	</XLink>
	<XLink
		label="label"
		description="description"
		href="#1"
		active />
	<XLink
		label="label"
		leftSection="mdi-home"
		description="description"
		href="#1"
		disabled />
	<XLink
		label="label"
		description="description"
		href="#1"
		leftSection={<XIcon>mdi-close</XIcon>}
		disabled>
			<XLink
				label="label"
				description="description"
				href="#1" />
			<XLink
				label="label"
				description="description"
				href="#1" />
			<XLink
				label="label"
				description="description"
				href="#1" />
			<XLink
				label="label"
				description="description"
				href="#1" />
	</XLink>
</XLink>
<XLink 
	label="label"
	href="#1"
	leftSection="mdi-close">
	<XLink 
		label="label" 
		href="#1" 
		leftSection="mdi-home">
		<XLink
			label="label"
			leftSection="mdi-home"
			description="description"
			href="#1" />
		<XLink
			label="label"
			description="description"
			href="#1" />
	</XLink>
	<XLink
		label="label"
		description="description"
		href="#1"
		active />
	<XLink
		label="label"
		leftSection="mdi-home"
		description="description"
		href="#1"
		disabled />
	<XLink
		label="label"
		description="description"
		href="#1"
		leftSection={<XIcon>mdi-close</XIcon>}>
			<XLink
				label="label"
				description="description"
				href="#1" />
			<XLink
				label="label"
				description="description"
				href="#1" />
			<XLink
				label="label"
				description="description"
				href="#1" />
			<XLink
				label="label"
				description="description"
				href="#1" />
	</XLink>
</XLink>`}
						</code>
					</pre>
				</div>
			</div>
		</div>
	);
}
