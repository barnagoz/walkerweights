import Gate from "@/components/auth/gate";

export default function App () {
    return (
        <Gate permission="app">
            <div>
                <h1>App</h1>
            </div>
        </Gate>
    );
}