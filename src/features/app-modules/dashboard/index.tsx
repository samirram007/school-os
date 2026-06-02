import { Main } from "#/layouts/protected/components/main";
import { useAuth } from "#/features/base-modules/auth/contexts/auth-context";

export default function Dashboard() {
    const { user } = useAuth();
    // console.log(user)
    return (
        <Main className="max-w-full flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" >
                {
                    user && user.name
                }
            </div>
        </Main>)
}