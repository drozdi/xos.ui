import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { forwardRefWithAs, render } from "../../internal/render";
import { Sections } from "../../internal/sections";
import { isString } from "../../utils/is";
import { XCollapse } from "../collapse";
import { XChevron, XIcon } from "../icon";
import "./style.css";
export const XLink = forwardRefWithAs(function XLinkFn(
	{
		className,
		children,
		noWrap,
		active,
		disabled,
		label,
		description,
		leftSection,
		rightSection,
		opened: _opened,
		onClick,
		onKeyDown,
		...props
	},
	ref
) {
	const withChildren = !!children;
	const [opened, setOpened] = useState(_opened);

	const handleClick = (event) => {
		if (disabled) {
			event.preventDefault();
			return;
		}
		onClick?.(event);
		if (withChildren) {
			event.preventDefault();
			setOpened((v) => !v);
		}
	};

	const handleKeyDown = (event) => {
		onKeyDown?.(event);
		if (event.code === "Space" && withChildren) {
			event.preventDefault();
			setOpened((v) => !v);
		}
	};

	useEffect(() => setOpened(_opened), [_opened]);

	return (
		<>
			<Sections
				as="a"
				{...props}
				square
				aria-label={isString(label) ? label : undefined}
				disabled={disabled}
				aria-disabled={disabled}
				className={({ isActive }) =>
					classNames(
						"x-link",
						{
							"x-link--nowrap": noWrap,
							"x-link--active": active || isActive,
							"x-link--opened": opened,
							"x-link--disabled": disabled,
						},
						className
					)
				}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				bodyClass="x-link-body"
				leftSection={leftSection}
				rightSection={
					withChildren ? (
						<XChevron className="x-link-chevron" />
					) : (
						rightSection
					)
				}
				ref={ref}
			>
				<span className="x-link-label">{label}</span>
				<span className="x-link-description">{description}</span>
			</Sections>
			<XCollapse active={opened}>
				<div className="x-link-childrens">{children}</div>
			</XCollapse>
		</>
	);

	return (
		<>
			{render(
				"a",
				{
					"aria-label": isString(label) ? label : undefined,
					...props,
					disabled,
					"aria-disabled": disabled,
					className: ({ isActive }) =>
						classNames(
							"x-link",
							{
								"x-link--nowrap": noWrap,
								"x-link--active": active || isActive,
								"x-link--opened": opened,
								"x-link--disabled": disabled,
							},
							className
						),
					onClick: handleClick,
					onKeyDown: handleKeyDown,
					children: (
						<>
							{leftSection && (
								<span className="x-link-section">
									{isString(leftSection) ? (
										<XIcon>{leftSection}</XIcon>
									) : (
										leftSection
									)}
								</span>
							)}

							<div className="x-link-body">
								<span className="x-link-label">{label}</span>
								<span className="x-link-description">
									{description}
								</span>
							</div>

							{(withChildren || rightSection) && (
								<span className="x-link-section">
									{withChildren ? (
										<XChevron className="x-link-chevron" />
									) : isString(rightSection) ? (
										<XIcon>{rightSection}</XIcon>
									) : (
										rightSection
									)}
								</span>
							)}
						</>
					),
					ref,
				},
				{
					active,
					opened,
					disabled,
				}
			)}
			<XCollapse active={opened}>
				<div className="x-link-childrens">{children}</div>
			</XCollapse>
		</>
	);
});

XLink.propTypes = {
	className: PropTypes.any,
	children: PropTypes.node,
	noWrap: PropTypes.bool,
	active: PropTypes.bool,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	description: PropTypes.string,
	leftSection: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	rightSection: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func,
};
