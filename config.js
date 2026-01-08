// ============================================
// CONFIGURATION SUPABASE
// ============================================

// Configuration Supabase
const SUPABASE_CONFIG = {
    URL: 'https://bxwfcuzfdgcuptgmcjqd.supabase.co',
    ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4d2ZjdXpmZGdjdXB0Z21janFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNzA5NzksImV4cCI6MjA4MDk0Njk3OX0.Cyss8F_D4sxxP901dDvTByAWgQhFP_dMcEPTs9w-0Xw',
    STORAGE_BUCKET: 'rayz-files'
};

// Configuration de l'application
const APP_CONFIG = {
    NAME: 'Ray-z System',
    VERSION: '2.0.0',
    ENVIRONMENT: 'production',
    DEBUG: false,
    
    // Paramètres système
    AUTO_SAVE_INTERVAL: 30000, // 30 secondes
    SYNC_INTERVAL: 60000, // 1 minute
    NOTIFICATION_TIMEOUT: 5000, // 5 secondes
    
    // Limites
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_TECHNICIENS_PER_TACHE: 5,
    MAX_NOTIFICATIONS: 100,
    
    // Chemins
    STORAGE_PATHS: {
        AVATARS: 'avatars',
        PV: 'preuves-travail',
        DOCUMENTS: 'documents',
        REPORTS: 'rapports'
    }
};

// Rôles et permissions
const ROLES_CONFIG = {
    BOSS: {
        name: 'Boss',
        permissions: [
            'ALL'
        ],
        color: '#7209b7'
    },
    SECRETARY: {
        name: 'Secrétaire',
        permissions: [
            'MANAGE_TASKS',
            'MANAGE_TECHNICIANS',
            'MANAGE_CLIENTS',
            'MANAGE_PLANNING',
            'VALIDATE_PV',
            'GENERATE_REPORTS',
            'SEND_NOTIFICATIONS'
        ],
        color: '#4361ee'
    },
    CHEF_PROJET: {
        name: 'Chef de projet',
        permissions: [
            'VIEW_TASKS',
            'UPDATE_TASKS',
            'VALIDATE_TASKS',
            'VIEW_TECHNICIANS',
            'VIEW_REPORTS'
        ],
        color: '#2ecc71'
    },
    TECHNICIAN: {
        name: 'Technicien',
        permissions: [
            'VIEW_OWN_TASKS',
            'UPDATE_OWN_TASKS',
            'UPLOAD_PV',
            'VIEW_CALENDAR',
            'VIEW_OWN_STATS'
        ],
        color: '#3498db'
    }
};

// Types de tâches
const TASK_TYPES = {
    INSTALLATION: {
        name: 'Installation',
        icon: 'fas fa-tools',
        color: '#4361ee',
        defaultPoints: 15
    },
    MAINTENANCE: {
        name: 'Maintenance',
        icon: 'fas fa-wrench',
        color: '#2ecc71',
        defaultPoints: 10
    },
    REPARATION: {
        name: 'Réparation',
        icon: 'fas fa-screwdriver',
        color: '#e74c3c',
        defaultPoints: 20
    },
    AUDIT: {
        name: 'Audit',
        icon: 'fas fa-clipboard-check',
        color: '#9b59b6',
        defaultPoints: 25
    },
    FORMATION: {
        name: 'Formation',
        icon: 'fas fa-chalkboard-teacher',
        color: '#1abc9c',
        defaultPoints: 30
    },
    URGENCE: {
        name: 'Urgence',
        icon: 'fas fa-exclamation-triangle',
        color: '#e67e22',
        defaultPoints: 40
    }
};

// Priorités
const PRIORITIES = {
    BASSE: {
        name: 'Basse',
        color: '#2ecc71',
        icon: 'fas fa-arrow-down'
    },
    MOYENNE: {
        name: 'Moyenne',
        color: '#f39c12',
        icon: 'fas fa-equals'
    },
    HAUTE: {
        name: 'Haute',
        color: '#e74c3c',
        icon: 'fas fa-arrow-up'
    },
    CRITIQUE: {
        name: 'Critique',
        color: '#c0392b',
        icon: 'fas fa-skull-crossbones'
    }
};

// Statuts
const STATUSES = {
    PLANIFIEE: {
        name: 'Planifiée',
        color: '#95a5a6',
        icon: 'fas fa-clock'
    },
    EN_ATTENTE: {
        name: 'En attente',
        color: '#f1c40f',
        icon: 'fas fa-hourglass-half'
    },
    EN_COURS: {
        name: 'En cours',
        color: '#3498db',
        icon: 'fas fa-play'
    },
    EN_PAUSE: {
        name: 'En pause',
        color: '#e67e22',
        icon: 'fas fa-pause'
    },
    TERMINEE: {
        name: 'Terminée',
        color: '#2ecc71',
        icon: 'fas fa-check'
    },
    ANNULEE: {
        name: 'Annulée',
        color: '#e74c3c',
        icon: 'fas fa-times'
    },
    EN_RETARD: {
        name: 'En retard',
        color: '#c0392b',
        icon: 'fas fa-exclamation-triangle'
    }
};

// Messages système
const SYSTEM_MESSAGES = {
    ERRORS: {
        NETWORK: 'Erreur de connexion. Vérifiez votre internet.',
        UNAUTHORIZED: 'Accès non autorisé. Veuillez vous reconnecter.',
        NOT_FOUND: 'Ressource non trouvée.',
        VALIDATION: 'Veuillez vérifier les informations saisies.',
        GENERIC: 'Une erreur est survenue. Veuillez réessayer.'
    },
    SUCCESS: {
        SAVED: 'Données sauvegardées avec succès.',
        UPDATED: 'Mise à jour réussie.',
        DELETED: 'Suppression réussie.',
        UPLOADED: 'Fichier uploadé avec succès.'
    },
    WARNINGS: {
        UNSAVED: 'Vous avez des modifications non sauvegardées.',
        DELETE_CONFIRM: 'Êtes-vous sûr de vouloir supprimer cet élément ?'
    }
};

// Fonctions utilitaires de configuration
class ConfigManager {
    constructor() {
        this.config = {
            supabase: null,
            currentUser: null,
            theme: localStorage.getItem('rayz-theme') || 'light',
            language: 'fr'
        };
    }

    // Initialiser Supabase
    initSupabase() {
        if (!window.supabase) {
            console.error('Supabase JS non chargé');
            return null;
        }

        try {
            this.config.supabase = window.supabase.createClient(
                SUPABASE_CONFIG.URL,
                SUPABASE_CONFIG.ANON_KEY,
                {
                    auth: {
                        persistSession: true,
                        autoRefreshToken: true
                    },
                    global: {
                        headers: {
                            'X-Client-Info': `rayz-system/${APP_CONFIG.VERSION}`
                        }
                    }
                }
            );
            
            console.log('Supabase initialisé avec succès');
            return this.config.supabase;
        } catch (error) {
            console.error('Erreur d\'initialisation de Supabase:', error);
            return null;
        }
    }

    // Obtenir la configuration Supabase
    getSupabaseConfig() {
        return SUPABASE_CONFIG;
    }

    // Obtenir la configuration de l'application
    getAppConfig() {
        return APP_CONFIG;
    }

    // Obtenir la configuration des rôles
    getRoleConfig(role) {
        return ROLES_CONFIG[role?.toUpperCase()] || ROLES_CONFIG.TECHNICIAN;
    }

    // Obtenir les types de tâches
    getTaskTypes() {
        return TASK_TYPES;
    }

    // Obtenir les priorités
    getPriorities() {
        return PRIORITIES;
    }

    // Obtenir les statuts
    getStatuses() {
        return STATUSES;
    }

    // Gérer le thème
    setTheme(theme) {
        this.config.theme = theme;
        localStorage.setItem('rayz-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }

    getTheme() {
        return this.config.theme;
    }

    toggleTheme() {
        const newTheme = this.config.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        return newTheme;
    }

    // Gérer l'utilisateur courant
    setCurrentUser(user) {
        this.config.currentUser = user;
        if (user) {
            localStorage.setItem('rayz-user', JSON.stringify(user));
        } else {
            localStorage.removeItem('rayz-user');
        }
    }

    getCurrentUser() {
        if (!this.config.currentUser) {
            const saved = localStorage.getItem('rayz-user');
            if (saved) {
                try {
                    this.config.currentUser = JSON.parse(saved);
                } catch (e) {
                    localStorage.removeItem('rayz-user');
                }
            }
        }
        return this.config.currentUser;
    }

    // Vérifier les permissions
    hasPermission(permission) {
        const user = this.getCurrentUser();
        if (!user) return false;

        const roleConfig = this.getRoleConfig(user.role);
        
        // Le boss a tous les droits
        if (user.role === 'boss') return true;
        
        return roleConfig.permissions.includes('ALL') || 
               roleConfig.permissions.includes(permission);
    }

    // Vérifier si l'utilisateur peut accéder à une page
    canAccessPage(page) {
        const user = this.getCurrentUser();
        if (!user) return false;

        // Pages accessibles à tous
        const publicPages = ['dashboard', 'tasks', 'calendar', 'profile'];
        if (publicPages.includes(page)) return true;

        // Pages selon le rôle
        switch (user.role) {
            case 'boss':
                return true; // Le boss accède à tout
            case 'secretaire':
                return ['technicians', 'planning', 'clients', 'reports', 'messages', 'admin'].includes(page);
            case 'chef_projet':
                return ['technicians', 'reports'].includes(page);
            default:
                return false;
        }
    }

    // Obtenir l'URL de stockage
    getStoragePath(type, filename) {
        const path = APP_CONFIG.STORAGE_PATHS[type.toUpperCase()];
        if (!path) {
            throw new Error(`Type de stockage inconnu: ${type}`);
        }
        return `${path}/${filename}`;
    }

    // Formater les dates
    formatDate(date, format = 'short') {
        if (!date) return '';
        
        const d = new Date(date);
        const options = {
            short: {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            },
            long: {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            },
            datetime: {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }
        };

        return d.toLocaleDateString('fr-FR', options[format] || options.short);
    }

    // Formater les heures
    formatTime(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Générer un ID unique
    generateId(prefix = '') {
        return `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    }

    // Valider un email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Valider un téléphone
    validatePhone(phone) {
        const re = /^[\d\s\-\+\(\)]{10,20}$/;
        return re.test(phone);
    }

    // Nettoyer les données pour Supabase
    sanitizeData(data) {
        const cleanData = {};
        
        for (const [key, value] of Object.entries(data)) {
            if (value === undefined || value === null) continue;
            
            // Convertir les dates en ISO string
            if (value instanceof Date) {
                cleanData[key] = value.toISOString();
            }
            // Nettoyer les strings
            else if (typeof value === 'string') {
                cleanData[key] = value.trim();
            }
            // Garder les autres types tels quels
            else {
                cleanData[key] = value;
            }
        }
        
        return cleanData;
    }

    // Gérer les erreurs Supabase
    handleSupabaseError(error) {
        console.error('Erreur Supabase:', error);
        
        let message = SYSTEM_MESSAGES.ERRORS.GENERIC;
        
        if (error.code === 'PGRST116') {
            message = 'Session expirée. Veuillez vous reconnecter.';
        } else if (error.code === '42501') {
            message = SYSTEM_MESSAGES.ERRORS.UNAUTHORIZED;
        } else if (error.code === '42P01') {
            message = 'Table non trouvée. Contactez l\'administrateur.';
        } else if (error.message.includes('NetworkError')) {
            message = SYSTEM_MESSAGES.ERRORS.NETWORK;
        }
        
        return {
            success: false,
            error: message,
            details: error
        };
    }

    // Gérer le succès
    handleSuccess(message = SYSTEM_MESSAGES.SUCCESS.SAVED, data = null) {
        return {
            success: true,
            message,
            data
        };
    }

    // Logger les actions
    logAction(action, details = {}) {
        if (!APP_CONFIG.DEBUG) return;
        
        const timestamp = new Date().toISOString();
        const user = this.getCurrentUser();
        
        const logEntry = {
            timestamp,
            action,
            user: user ? { id: user.id, email: user.email } : null,
            details,
            userAgent: navigator.userAgent
        };
        
        console.log('[RAYZ-LOG]', logEntry);
        
        // Envoyer au serveur si connecté
        if (this.config.supabase && user) {
            this.config.supabase
                .from('logs_activite')
                .insert({
                    utilisateur_id: user.id,
                    action,
                    details,
                    ip_address: 'client-side'
                })
                .catch(console.error);
        }
    }
}

// Singleton
const configManager = new ConfigManager();

// Export pour utilisation globale
window.RayzConfig = configManager;

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    // Appliquer le thème sauvegardé
    const savedTheme = localStorage.getItem('rayz-theme') || 'light';
    configManager.setTheme(savedTheme);
    
    // Initialiser Supabase
    const supabase = configManager.initSupabase();
    
    if (supabase) {
        console.log('Configuration chargée avec succès');
        
        // Vérifier la session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                console.log('Session existante détectée');
            }
        });
        
        // Écouter les changements d'authentification
        supabase.auth.onAuthStateChange((event, session) => {
            console.log('Changement d\'état auth:', event, session);
            
            if (event === 'SIGNED_IN' && session) {
                configManager.setCurrentUser(session.user);
            } else if (event === 'SIGNED_OUT') {
                configManager.setCurrentUser(null);
            }
        });
    }
});