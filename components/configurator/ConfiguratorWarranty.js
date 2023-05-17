import ShieldCheckIcon from '@heroicons/react/outline/ShieldCheckIcon'

export default function ConfiguratorWarranty() {

  return (
    <div className="flex flex-row items-center justify-start bg-zinc-50 border-y border-gray-200 py-4 w-full">
        <ShieldCheckIcon className="h-6 w-6 flex-shrink-0 mr-1 text-gray-900" aria-hidden="true"/>
        <div className="flex flex-col items-start">
            <span className="text-sm text-left text-gray-900 font-medium">
                Life-time frame warranty
            </span>
            <span className="text-sm text-left text-gray-900 font-medium">
                One-Year components warranty
            </span>
        </div>
    </div>
  );
}
