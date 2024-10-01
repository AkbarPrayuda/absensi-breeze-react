export const Pagination = ({ links }) => {
    return (
        <nav aria-label="Page navigation" className="w-full">
            <ul className="flex flex-wrap justify-center space-x-1 space-y-1 sm:space-x-2 sm:space-y-0">
                {links.map((link, index) => (
                    <li key={index} className="flex-shrink-0">
                        <a
                            href={link.url}
                            className={`px-2 py-1 text-sm sm:px-3 sm:py-2 sm:text-base rounded-md ${
                                link.active
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: link.label
                                    .replace("«", "←")
                                    .replace("»", "→"),
                            }}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
};
