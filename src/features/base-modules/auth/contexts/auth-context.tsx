import { flushSync } from 'react-dom';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { encryptData, decryptData } from '@/utils/crypto-storage';
import type { AuthRequest, AuthResponse, UserWithRole } from '../data/schema';
import type { UserFiscalYear } from '#/features/base-modules/user_fiscal_year/data/schema';
import type { Role } from '#/features/base-modules/role/data/schema';
import type { Permission } from '#/features/base-modules/permission/data/schema';
import { useQueryClient } from '@tanstack/react-query';
import { fetchUserProfileService, loginService, logoutService } from '../data/apis';
import { env } from '@/env';

const AUTH_STORAGE = env.VITE_AUTH_STORAGE === 'localStorage' ? localStorage : sessionStorage;

 

export type PeriodType = {
    startDate: Date | null;
    endDate: Date | null;
}
export interface AuthContextType {
    user: UserWithRole | null;
    userFiscalYear: UserFiscalYear | null;
    tenantId: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    
    logout: () => Promise<void>;
    fetchProfile: () => Promise<boolean>;
    permissions: string[];
    period: PeriodType | null;
    setPeriod: (period: PeriodType | null) => void;
    successfullLogin: (data: AuthResponse) => Promise<boolean>;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // const navigate = useNavigate();
    // const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [user, setUser] = useState<UserWithRole | null>(null);
    const [userFiscalYear, setUserFiscalYear] = useState<UserFiscalYear | null>(null);
    const [tenantId, setTenantId] = useState<string | null>(null);
    const [period, setPeriod] = useState<PeriodType | null>(null);
    const [permissions, setpermissions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const queryClient = useQueryClient();
    const fetchProfile = async (): Promise<boolean> => {
        setIsLoading(true);

        try {
         
            console.log('fetching user profile:');
            const data = await fetchUserProfileService();
            console.log('Fetched user profile:', data);
            flushSync(() => {
                const userData = data?.data;
                
                // Securely store encrypted user data
                encryptData(JSON.stringify(userData), 'secret@123').then(encrypted => {
                    AUTH_STORAGE.setItem('user', encrypted);
                });

                setUser(userData);

                const fiscalYear = userData?.userFiscalYear;
                setUserFiscalYear(fiscalYear || null);

                const tId = fiscalYear?.fiscalYear?.companyId?.toString() || null;
                setTenantId(tId);
                if (tId) {
                    AUTH_STORAGE.setItem('x-tenant-key', tId);
                } else {
                    AUTH_STORAGE.removeItem('x-tenant-key');
                }

                setPeriod(fiscalYear ? {
                    startDate: new Date(fiscalYear.startDate),
                    endDate: new Date(fiscalYear.endDate)
                } : null);
                const perms: string[] = [];

                userData?.roles?.forEach((role: Role) => {
                    role?.permissions?.forEach((permission: Permission) => {
                        if (permission.isAllowed && !perms.includes(permission.appModuleFeature?.code || '')) {
                            perms.push(permission.appModuleFeature?.code || '');
                        }
                    });
                });

                setpermissions(perms);
            })

            return true;
        } catch (error) {
            flushSync(() => {
                setUser(null);
                setUserFiscalYear(null);
                setTenantId(null);
                AUTH_STORAGE.removeItem('x-tenant-key');
            })

            return false;
        } finally {
            setIsLoading(false);
        }
    };


    const successfullLogin = async (data: AuthResponse): Promise<boolean> => {
        if (data.success) {
            AUTH_STORAGE.setItem('token', data.accessToken);
              await fetchProfile();
    
            // if (!user) {
            //     AUTH_STORAGE.removeItem('token');
            //     AUTH_STORAGE.removeItem('user');
            //     return false;
            // }
            return true;
        } else {
            flushSync(() => {
                setUser(null);
                setUserFiscalYear(null);
                setTenantId(null);
                AUTH_STORAGE.removeItem('x-tenant-key');
            })
            return false;
        }
    }

    const logout = React.useCallback(async () => {
        console.log('Logging out...');
        setIsLoading(true);
        try {
            // Optionally hit a logout endpoint to clear server-side auth
            await logoutService();
        } catch (error) {
            console.error("Logout API failed:", error);
        } finally {
            // Always clear client-side cache even if API fails
            flushSync(() => {
                queryClient.clear();
                setUser(null);
                setUserFiscalYear(null);
                setTenantId(null);
                AUTH_STORAGE.removeItem('x-tenant-key');
                AUTH_STORAGE.removeItem('user');
                AUTH_STORAGE.removeItem('token');
            })
            setIsLoading(false);
        }
    }, [])



    useEffect(() => {
        const token = AUTH_STORAGE.getItem('token');
        if (token) {
            fetchProfile();
        } else {
            setIsLoading(false);
        }
    }, []);
    return (
        <AuthContext.Provider
            value={{ user, isLoading,successfullLogin, userFiscalYear, tenantId, period, setPeriod, isAuthenticated: !!user,            logout, fetchProfile, permissions }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
