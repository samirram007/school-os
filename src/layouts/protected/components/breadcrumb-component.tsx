import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "#/components/ui/breadcrumb";
import { IconHome } from "@tabler/icons-react";
import { useMatches, Link } from '@tanstack/react-router'
// This component generates a breadcrumb navigation based on the current route matches. It filters the matches to find those that have a `breadcrumb` property in their static data and constructs a breadcrumb trail accordingly. Each breadcrumb item is rendered as a link, except for the last item which is rendered as plain text to indicate the current page. The home icon is used as the first breadcrumb item, linking back to the root path.
// still needs some work, but it's a good start for dynamic breadcrumbs in a React Router application.
// need to implement a way to handle dynamic routes and their breadcrumb names, perhaps by allowing the staticData to be a function that receives the route params and returns a string.
export default function BreadcrumbComponent() {
    const matches = useMatches()

    const breadcrumbs = matches
        .filter((match) => match.staticData?.breadcrumb ?? '')
        .map((match) => ({
            name: match.staticData.breadcrumb,
            href: match.pathname,
        }))

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={'/'}><IconHome size={16} /></Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1

                    return (
                        <div key={item.href} className="flex items-center">
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link to={item.href}>{item.name}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>

                            {!isLast && <BreadcrumbSeparator />}
                        </div>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}