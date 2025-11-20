'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { User, Building2, LogOut, Edit, Save, X } from 'lucide-react';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        // Get user from localStorage (set during login)
        const userData = localStorage.getItem('user');
        if (!userData) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(userData));
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
        // Reload user data
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Chargement...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const isCompany = user.userType === 'company';

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="Réseau TSI"
                                className="h-10 w-auto"
                            />
                            <h1 className="text-2xl font-bold text-gray-900">Réseau TSI</h1>
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <LogOut size={18} />
                            Déconnexion
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 text-white mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            {isCompany ? <Building2 size={32} /> : <User size={32} />}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">Bienvenue, {user.firstName || user.name}!</h2>
                            <p className="text-orange-100">
                                {isCompany ? 'Compte Structure' : 'Compte Intervenant'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="bg-green-500 w-2 h-2 rounded-full"></span>
                        <span className="flex items-center gap-1">
                            Compte vérifié
                            <img src="/check.png" alt="Vérifié" className="w-4 h-4 inline" />
                        </span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="Statut du compte"
                        value="Vérifié"
                        iconImage="/check.png"
                        color="green"
                    />
                    <StatCard
                        title="Type de compte"
                        value={isCompany ? 'Structure' : 'Intervenant'}
                        iconImage={isCompany ? '/structure.png' : undefined}
                        icon={!isCompany ? '👤' : undefined}
                        color="blue"
                    />
                    <StatCard
                        title="Membre depuis"
                        value={new Date(user.createdAt).toLocaleDateString('fr-FR', {
                            month: 'long',
                            year: 'numeric'
                        })}
                        iconImage="/calendar.png"
                        color="purple"
                    />
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">Mon Profil</h3>
                        {!editing ? (
                            <Button
                                onClick={handleEdit}
                                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
                            >
                                <Edit size={18} />
                                Modifier
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleCancel}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <X size={18} />
                                    Annuler
                                </Button>
                            </div>
                        )}
                    </div>

                    {editing ? (
                        <EditProfileForm user={user} setUser={setUser} setEditing={setEditing} />
                    ) : (
                        <ViewProfile user={user} isCompany={isCompany} />
                    )}
                </div>
            </main>
        </div>
    );
}

function StatCard({
    title,
    value,
    icon,
    iconImage,
    color,
}: {
    title: string;
    value: string;
    icon?: string;
    iconImage?: string;
    color: 'green' | 'blue' | 'purple';
}) {
    const colorClasses = {
        green: 'from-green-500 to-emerald-600',
        blue: 'from-orange-500 to-amber-600',
        purple: 'from-orange-600 to-red-600',
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
                    {iconImage ? (
                        <img src={iconImage} alt={title} className="w-6 h-6" />
                    ) : (
                        <span className="text-2xl">{icon}</span>
                    )}
                </div>
            </div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">{title}</h4>
            <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
    );
}

function ViewProfile({ user, isCompany }: { user: any; isCompany: boolean }) {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Common Fields */}
            <InfoField label="Prénom" value={user.firstName} />
            <InfoField label="Nom" value={user.lastName} />
            <InfoField label="Email" value={user.email} />
            <InfoField label="Téléphone" value={user.phone} />

            {/* Company Specific */}
            {isCompany && (
                <>
                    <InfoField label="Nom de la structure" value={user.companyName} />
                    <InfoField label="Service" value={user.service} />
                    <InfoField label="Fonction" value={user.jobTitle} className="md:col-span-2" />
                </>
            )}

            {/* Contributor Specific */}
            {!isCompany && (
                <>
                    <InfoField label="Date de naissance" value={user.birthDate} />
                    <InfoField label="Lieu de naissance" value={user.birthPlace} />
                    <InfoField label="Pays de naissance" value={user.birthCountry} />
                    <InfoField label="Nationalité" value={user.nationality} />
                    <InfoField label="N° Siret" value={user.siretNumber} />
                    <InfoField label="Adresse" value={user.address} className="md:col-span-2" />
                    <InfoField
                        label="Permis B"
                        value={user.hasDriverLicense ? 'Oui' : 'Non'}
                        className="md:col-span-2"
                    />
                </>
            )}

            <InfoField
                label="Date d'inscription"
                value={new Date(user.createdAt).toLocaleDateString('fr-FR')}
                className="md:col-span-2"
            />
        </div>
    );
}

function InfoField({
    label,
    value,
    className = '',
}: {
    label: string;
    value?: string;
    className?: string;
}) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
            <p className="text-gray-900 font-medium">{value || 'Non renseigné'}</p>
        </div>
    );
}

function EditProfileForm({
    user,
    setUser,
    setEditing,
}: {
    user: any;
    setUser: any;
    setEditing: any;
}) {
    const [formData, setFormData] = useState(user);
    const [saving, setSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch('/api/user/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                setEditing(false);
                alert('Profil mis à jour avec succès!');
            } else {
                alert(data.error || 'Erreur lors de la mise à jour');
            }
        } catch (error) {
            alert('Erreur de connexion au serveur');
        } finally {
            setSaving(false);
        }
    };

    const isCompany = user.userType === 'company';

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                {/* Common Fields */}
                <InputField
                    label="Prénom"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Nom"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Téléphone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <InputField label="Email" value={formData.email} disabled />

                {/* Company Specific */}
                {isCompany && (
                    <>
                        <InputField
                            label="Nom de la structure"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Fonction"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            required
                            className="md:col-span-2"
                        />
                    </>
                )}

                {/* Contributor Specific */}
                {!isCompany && (
                    <>
                        <InputField
                            label="Date de naissance"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Lieu de naissance"
                            name="birthPlace"
                            value={formData.birthPlace}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Pays de naissance"
                            name="birthCountry"
                            value={formData.birthCountry}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Nationalité"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="N° Siret"
                            name="siretNumber"
                            value={formData.siretNumber}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Adresse"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="md:col-span-2"
                        />
                    </>
                )}
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-8"
                >
                    <Save size={18} />
                    {saving ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
            </div>
        </form>
    );
}

function InputField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    required = false,
    disabled = false,
    className = '',
}: {
    label: string;
    name?: string;
    type?: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value || ''}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
        </div>
    );
}
