
import { useAuth } from "#/features/base-modules/auth/contexts/auth-context";
import { Link } from "@tanstack/react-router";
// import { Route as UserFiscalYearRoute } from '/_protected/(auth)/user-fiscal-year/_layout/';

type FiscalYearSelectorProps = {
    visible: boolean
}

const FiscalYearSelector = (props: FiscalYearSelectorProps) => {
    const { userFiscalYear } = useAuth();
    const { visible } = props
    if (!visible) return null;
    return (
        <div className="card min-w-0 max-w-[10rem] text-[11px] leading-tight sm:max-w-[14rem] sm:text-xs">
            <div className="truncate text-slate-500 dark:text-slate-400">Company / Financial Year</div>
            <div className="cursor-pointer truncate font-bold" >
                <Link to={'/user-fiscal-year'} className="hover:underline">
                    {userFiscalYear?.fiscalYear?.name || "No Fiscal Year Assigned"}
                </Link>
            </div>
        </div>
    )
}

export default FiscalYearSelector