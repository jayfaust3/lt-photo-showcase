export type FilterProps = {
    validator: (searchText: string) => boolean
    filterHandler: (searchText: string) => void
    validationText: string
}
